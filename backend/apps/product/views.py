from django.db.models import Count
from rest_framework import viewsets
from .models import Product, Manufacture, Category, Provider, PriceHistory
from .serializers import ProductSerializer, ManufactureSerializer, CategorySerializer, ProviderSerializer, PriceHistorySerializer
from common.configuration.pagination import StandardResultsSetPagination
from django.db.models.functions import Trim, Replace
from django.db.models import Q, F, Value, Subquery
from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from common.utils import search_functions


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination


class ProductRankView(APIView):
    def get(self, request, product_id):
        try:
            query_params = request.query_params
            filterByPriceByWeight = query_params.get('filter', None)

            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        products = search_functions.full_search_products(
            product.name).order_by('current_price', 'price_by_weight')

        # Clean Name
        products = search_functions.get_products_cleaned_name(
            products
        )

        if search_functions.is_combo_product(product):
            products = search_functions.filter_products_by_mode(
                products,
                'combo'
            )
        else:
            products = search_functions.filter_products_by_mode(
                products,
                'simple'
            )

        if filterByPriceByWeight == 'price_by_weight':
            products = products.exclude(
                price_by_weight=None).order_by('price_by_weight')

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

        serializer = ProductSerializer(
            related_products.exclude(pk=product.pk).distinct().order_by('current_price')[:20], many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class PriceHistoryListView(generics.ListAPIView):
    serializer_class = PriceHistorySerializer
    pagination_class = None  # Deshabilitar la paginación

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        latest_90_ids = PriceHistory.objects.filter(product__id=product_id).order_by(
            '-date').values_list('id', flat=True)[:90]
        return PriceHistory.objects.filter(id__in=Subquery(latest_90_ids)).order_by('date')


class ManufactureViewSet(viewsets.ModelViewSet):
    queryset = Manufacture.objects.all().order_by('name')
    serializer_class = ManufactureSerializer
    pagination_class = StandardResultsSetPagination

    def get_queryset(self):
        # Elimina tabulaciones, retornos de carro y nuevas líneas
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
        return queryset


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(parent__isnull=True)
    serializer_class = CategorySerializer
    pagination_class = StandardResultsSetPagination


class ProviderViewSet(viewsets.ModelViewSet):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer
    pagination_class = None


class ProductTestView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Get products that have price history entries with different prices
        products_with_different_prices = Product.objects.filter(
            price_history__isnull=False
        ).annotate(
            num_different_prices=Count('price_history__price', distinct=True)
        ).filter(
            num_different_prices__gt=1
        )
        return products_with_different_prices


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
