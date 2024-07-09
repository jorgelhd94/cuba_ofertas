from datetime import timedelta
from rest_framework import viewsets

from common.utils.categories_functions import add_product_counts_to_tree, category_to_dict
from common.utils.common import clean_name_trim
from common.utils.manufacture_functions import get_manufacture_ids_from_params
from common.utils.test import test_set_previous_price, test_set_previous_price_updated_at
from .models import Product, Manufacture, Category, Provider, PriceHistory
from .serializers import ProductSerializer, ManufactureSerializer, CategorySerializer, ProviderSerializer, PriceHistorySerializer
from common.configuration.pagination import BigResultsSetPagination, StandardResultsSetPagination
from django.db.models.functions import Trim, Replace
from django.db.models import Q, F, Value, Count, Prefetch
from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from common.utils import search_functions

from apps.product import serializers


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination

    @action(detail=False, methods=['get'])
    def range_prices(self, request):
        products = Product.objects.all().order_by("current_price")

        return Response({
            "min_price": products.first().current_price,
            "max_price": products.last().current_price,
        })


class ProductRankView(APIView):
    def get(self, request, product_id):
        try:
            query_params = request.query_params
            filterByPriceByWeight = query_params.get('filter', None)

            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        products = search_functions.get_ranked_products_sm23(product)

        if filterByPriceByWeight == 'price_by_weight':
            min_price = product.price_by_weight * 0.5
            max_price = product.price_by_weight * 1.5

            products = products.exclude(
                price_by_weight=None).order_by('price_by_weight').filter(price_by_weight__gte=min_price, price_by_weight__lte=max_price)

        # Buscar la posición del producto
        position = list(products).index(product) + 1

        serializer = ProductSerializer(products, many=True)

        return Response({"product_id": product.id, "rank": position, "products": serializer.data}, status=status.HTTP_200_OK)


class RelatedProductsView(APIView):
    def get(self, request, pk):
        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        related_products = search_functions.full_search_products(product.name)

        related_products_by_categories = related_products.filter(
            Q(categories__in=product.categories.all())
        )

        if related_products_by_categories.count() > 0:
            related_products = related_products_by_categories

        # Filtrar productos cuya diferencia de precio no sea mayor al 50%
        related_products = related_products.exclude(pk=product.pk).distinct()
        # related_products = related_products.annotate(
        #     price_difference_percentage=100 * (F('current_price') - product.current_price) / product.current_price
        # ).filter(price_difference_percentage__lte=50)

        serializer = ProductSerializer(
            related_products.order_by('current_price')[:20], many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class PriceHistoryListView(generics.ListAPIView):
    serializer_class = PriceHistorySerializer
    pagination_class = None  # Deshabilitar la paginación

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')

        # Obtener los últimos 90 ids ordenados por fecha
        latest_90_ids = PriceHistory.objects.filter(product__id=product_id).order_by(
            '-date').values_list('id', flat=True)[:90]

        # Obtener los registros de PriceHistory correspondientes a esos IDs
        price_histories = PriceHistory.objects.filter(
            id__in=latest_90_ids).order_by('date')

        if not price_histories.exists():
            return []  # Si no hay registros, retornar una lista vacía

        # Crear un diccionario de fechas a precios
        existing_price_dict = {ph.date: ph for ph in price_histories}

        # Inicializar variables
        filled_price_history_list = []
        previous_date = None

        # Rellenar las fechas faltantes
        for current_date in sorted(existing_price_dict.keys()):
            if previous_date:
                # Calcular el número de días entre la fecha actual y la anterior
                delta = (current_date.date() - previous_date.date()).days
                for i in range(1, delta):
                    missing_date = previous_date + timedelta(days=i)
                    filled_price_history_list.append(PriceHistory(
                        date=missing_date, price=None, product_id=product_id))

            # Añadir la fecha actual
            filled_price_history_list.append(existing_price_dict[current_date])
            previous_date = current_date

        return filled_price_history_list


class ManufactureViewSet(viewsets.ModelViewSet):
    queryset = Manufacture.objects.all().order_by('name')
    serializer_class = ManufactureSerializer
    pagination_class = BigResultsSetPagination

    def get_queryset(self):
        search_text = self.request.query_params.get('search', '').strip()

        queryset = Manufacture.objects.annotate(
            cleaned_name=Trim(
                Replace(
                    Replace(
                        Replace(F('name'), Value('\t'), Value('')),
                        Value('\r'), Value('')
                    ),
                    Value('\n'), Value('')
                )
            )
        ).order_by('cleaned_name')

        if search_text:
            queryset = queryset.filter(cleaned_name__icontains=search_text)

        return queryset


class ManufactureAPIView(APIView):
    def get(self, request):
        query_params = request.query_params

        # Obtener los IDs desde los query params
        try:
            ids = get_manufacture_ids_from_params(query_params)
        except ValueError as e:
            return Response({"detail": str(e)}, status=400)

        # Obtener el conteo de productos por fabricante
        manufactures_count = search_functions.get_product_queryset(
            query_params, exclude_manufactures=True
        ).values('manufacture').annotate(count=Count('manufacture'))

        # Crear un diccionario con los conteos de productos por fabricante
        manufactures_count_dict = {}
        for item in manufactures_count:
            manufactures_id = item['manufacture']
            count = item['count']

            if manufactures_id in manufactures_count_dict:
                manufactures_count_dict[manufactures_id] += count
            else:
                manufactures_count_dict[manufactures_id] = count

        # Filtrar los fabricantes por los IDs proporcionados, si existen
        manufactures = Manufacture.objects.annotate(
            cleaned_name=clean_name_trim()
        )

        if ids:
            manufactures = manufactures.filter(id__in=ids)
        else:
            manufactures = manufactures.filter(
                id__in=manufactures_count_dict.keys())

        # Obtener el texto de búsqueda desde los query params
        search_text = query_params.get('search', '').strip()

        # Filtrar por nombre limpio si se proporciona un texto de búsqueda
        if search_text:
            manufactures = manufactures.filter(
                cleaned_name__icontains=search_text)

        # Comprobar si el parámetro 'page' está en los query_params
        if 'page' in query_params:
            paginator = BigResultsSetPagination()
            page = paginator.paginate_queryset(
                manufactures.order_by('cleaned_name'), request)
            if page is not None:
                serializer = ManufactureSerializer(page, many=True, context={
                                                   'product_counts': manufactures_count_dict})
                return paginator.get_paginated_response(serializer.data)
        else:
            # Sin paginación
            serializer = ManufactureSerializer(manufactures.order_by(
                'cleaned_name'), many=True, context={'product_counts': manufactures_count_dict})
            return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    pagination_class = None

    def get_queryset(self):
        queryset = Category.objects.filter(parent__isnull=True).order_by(
            'name').annotate(products_count=Count('products'))

        return queryset

    @action(detail=True, methods=['get'])
    def details(self, request, pk):
        category = Category.objects.get(pk=pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)


class CategoryAPIView(APIView):
    def get(self, request):
        query_params = request.query_params

        # Obtener el queryset y agrupar por categorías, luego contar cada grupo
        categories_count = search_functions.get_product_queryset(
            query_params, exclude_categories=True
        ).values('categories').annotate(count=Count('categories'))

        # Convertir los resultados a un diccionario
        categories_count_dict = {}
        for item in categories_count:
            category_id = item['categories']
            count = item['count']
            if category_id in categories_count_dict:
                categories_count_dict[category_id] += count
            else:
                categories_count_dict[category_id] = count

        root_categories = Category.objects.filter(parent__isnull=True).order_by('name').prefetch_related(
            Prefetch('children', queryset=Category.objects.all(
            ).prefetch_related('children').order_by('name'))
        )

        # Organizar la estructura de árbol con los conteos de productos
        for root_category in root_categories:
            add_product_counts_to_tree(root_category, categories_count_dict)

        category_tree_dict = [category_to_dict(
            category) for category in root_categories if category.products_count > 0]

        return Response(category_tree_dict)


class ProviderViewSet(viewsets.ModelViewSet):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer
    pagination_class = None


class ProductTestView(APIView):
    def get(self, request):
        products = test_set_previous_price()
        return Response({'products': products.count()}, status=status.HTTP_200_OK)


# class ComparisonZoneViewSet(viewsets.ModelViewSet):
#     queryset = ComparisonZone.objects.all()
#     serializer_class = ComparisonZoneSerializer
#     pagination_class = None

#     @action(detail=True, methods=['post'])
#     def add_product_to_compare(self, request, pk):
#         serializer = ProductSerializer(data=request.data["product"])

#         if not serializer.is_valid():
#             return Response({"detail": "The product data isn't valid"}, status=status.HTTP_400_BAD_REQUEST)

#         product = Product.objects.get(
#             product_id=serializer.validated_data["product_id"])

#         comparison_zone = ComparisonZone.objects.get(pk=pk)

#         if not comparison_zone.comparison_products.filter(id=product.id).exists():
#             # If not, add the product to the comparison_products
#             comparison_zone.comparison_products.add(product)

#         return Response({'pk': pk}, status=status.HTTP_201_CREATED)

#     @action(detail=True, methods=['delete'])
#     def remove_product_from_compare(self, request, pk):
#         serializer = ProductSerializer(data=request.data["product"])

#         if not serializer.is_valid():
#             return Response({"detail": "The product data isn't valid"}, status=status.HTTP_400_BAD_REQUEST)

#         product = Product.objects.get(
#             product_id=serializer.validated_data["product_id"])

#         comparison_zone = ComparisonZone.objects.get(pk=pk)

#         if comparison_zone.comparison_products.filter(id=product.id).exists():
#             # If not, add the product to the comparison_products
#             comparison_zone.comparison_products.remove(product)

#         return Response({'pk': pk, 'product_id': product.product_id}, status=status.HTTP_200_OK)
