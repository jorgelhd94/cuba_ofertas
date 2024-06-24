from rest_framework import viewsets
from .models import Product, Manufacture, Category, Provider
from .serializers import ProductSerializer, ManufactureSerializer, CategorySerializer, ProviderSerializer
from common.configuration.pagination import StandardResultsSetPagination
from django.db.models.functions import Trim, Replace
from django.db.models import F, Value

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
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Obtener todos los productos ordenados por precio de menor a mayor
        products = search_functions.full_search_products(product.name).order_by('current_price')

        # Clean Name
        products = search_functions.get_products_cleaned_name(
                products
            )
        
        # Buscar la posición del producto
        position = list(products).index(product) + 1

        serializer = ProductSerializer(products, many=True)

        return Response({"product_id": product_id, "rank": position, "products": serializer.data}, status=status.HTTP_200_OK)


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
