from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import status
from .models import Product, Manufacture, ComparisonZone, Category, Provider
from .serializers import ProductSerializer, ManufactureSerializer, ComparisonZoneSerializer, CategorySerializer, ProviderSerializer
from common.configuration.pagination import StandardResultsSetPagination 

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination


class ManufactureViewSet(viewsets.ModelViewSet):
    queryset = Manufacture.objects.all()
    serializer_class = ManufactureSerializer
    pagination_class = StandardResultsSetPagination


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = StandardResultsSetPagination

class ProviderViewSet(viewsets.ModelViewSet):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer
    pagination_class = StandardResultsSetPagination

class ComparisonZoneViewSet(viewsets.ModelViewSet):
    queryset = ComparisonZone.objects.all()
    serializer_class = ComparisonZoneSerializer
    pagination_class = StandardResultsSetPagination

    @action(detail=True, methods=['post'])
    def add_product_to_compare(self, request, pk):
        serializer = ProductSerializer(data=request.data["product"])
        
        if not serializer.is_valid():
            return Response({"detail": "The product data isn't valid"}, status=status.HTTP_400_BAD_REQUEST)
        
        product = serializer.save()

        comparison_zone = ComparisonZone.objects.get(pk=pk)

        if not comparison_zone.comparison_products.filter(id=product.id).exists():
            # If not, add the product to the comparison_products
            comparison_zone.comparison_products.add(product)
        
        return Response({'pk': pk}, status=status.HTTP_201_CREATED)
    
    @action(detail=True, methods=['delete'])
    def remove_product_from_compare(self, request, pk):
        serializer = ProductSerializer(data=request.data["product"])
        
        if not serializer.is_valid():
            return Response({"detail": "The product data isn't valid"}, status=status.HTTP_400_BAD_REQUEST)
        
        product = serializer.save()

        comparison_zone = ComparisonZone.objects.get(pk=pk)

        if comparison_zone.comparison_products.filter(id=product.id).exists():
            # If not, add the product to the comparison_products
            comparison_zone.comparison_products.remove(product)

        return Response({'pk': pk, 'product_id': product.product_id}, status=status.HTTP_200_OK)
        

