from unicodedata import category
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from common.configuration.pagination import StandardResultsSetPagination
from apps.product.models import Category, Product, Provider
from apps.product.serializers import ProductSerializer
from common.utils import search_functions

from .tasks import update_database_sm23, test_auth, update_providers


# Ordenar productos si se proporciona orderby
order_mapping = {
    'default': 'cleaned_name',         # Por nombre
    'less_price': 'current_price',     # Menor precio
    'higher_price': '-current_price',    # Mayor precio
    'new': '-created_at',       # Más nuevo
    'less_price_by_weight': 'price_by_weight'    # Menor precio/lb
}


class SearchView(APIView):
    def get(self, request):
        try:
            query_params = request.query_params
            search_text = query_params.get('q', '')
            orderby = query_params.get('orderby', 'default')
            mode = query_params.get('mode', 'show_all')
            price_by_weight = query_params.get('price_by_weight', 'show_all')
            provider = query_params.get('provider', '')
            category = query_params.get('category', '')

            # Filter products based on search_text
            products_queryset = search_functions.full_search_products(
                search_text) if search_text else Product.objects.all()

            # Clean Name
            products_queryset = search_functions.get_products_cleaned_name(
                products_queryset
            )

            # Order By
            try:
                if orderby == 'default':
                    products_queryset = products_queryset.order_by('-rank')
                else:
                    products_queryset = products_queryset.order_by(
                        order_mapping.get(orderby, 'cleaned_name'))
            except:
                products_queryset = products_queryset.order_by(
                    order_mapping.get(orderby, 'cleaned_name'))

            # Mode
            products_queryset = search_functions.filter_products_by_mode(
                products_queryset, mode)

            # Price By Weight
            products_queryset = search_functions.filter_by_price_weight(
                products_queryset, price_by_weight)

            # Filter by provider
            if provider:
                provider = Provider.objects.get(pk=provider)
                products_queryset = products_queryset.filter(provider=provider)

            # Filter by category
            if category:
                try:
                    category = Category.objects.get(pk=category)
                    categories_list = [category] + category.get_descendants()
                    products_queryset = products_queryset.filter(categories__in=categories_list)
                except Category.DoesNotExist:
                    products_queryset = products_queryset.none()

            # Paginación
            paginator = StandardResultsSetPagination()

            # Validate page
            page_number = search_functions.get_valid_page(
                request, query_params, paginator, products_queryset.count())

            request.query_params._mutable = True
            request.query_params[paginator.page_query_param] = str(page_number)
            request.query_params._mutable = False

            page = paginator.paginate_queryset(products_queryset, request)

            serializer = ProductSerializer(page, many=True)

            return paginator.get_paginated_response(serializer.data)

        except Exception as e:
            print("Ocurrió un error:", e)
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateDatabaseView(APIView):
    def get(self, request):
        return Response({"msg": update_providers()})


class TestAuthView(APIView):
    def get(self, request):
        test_auth()
        return Response({"msg": "Autenticacion ok"})
