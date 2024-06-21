from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from common.configuration.pagination import StandardResultsSetPagination
from django.db.models import Q
from apps.product.models import Product, Provider
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
            provider = query_params.get('provider', '')

            # Filter products based on search_text
            products_queryset = search_functions.search_products(
                search_text) if search_text else Product.objects.all()

            # Clean Name
            products_queryset = search_functions.get_products_cleaned_name(
                products_queryset
            )

            # Order By
            products_queryset = products_queryset.order_by(
                order_mapping.get(orderby, 'cleaned_name'))

            # Mode
            if mode in ['combo', 'simple']:
                descendant_category_ids = search_functions.get_descendant_category_ids(
                    'Combos')
                if mode == 'combo':
                    combo_name_filtered_ids = search_functions.filter_products_by_combo_name(
                        products_queryset)
                    products_queryset = products_queryset.filter(
                        Q(categories__id__in=descendant_category_ids) | Q(
                            id__in=combo_name_filtered_ids)
                    )
                elif mode == 'simple':
                    combo_name_filtered_ids = search_functions.filter_products_by_combo_name(
                        products_queryset)
                    products_queryset = products_queryset.exclude(
                        Q(categories__id__in=descendant_category_ids) | Q(
                            id__in=combo_name_filtered_ids)
                    )

            # Filter by provider
            if provider:
                provider = Provider.objects.get(pk=provider)
                products_queryset = products_queryset.filter(provider=provider)

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
