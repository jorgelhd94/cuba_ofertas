from rest_framework import viewsets
from .models import Product, Manufacture, ComparisonZone
from .serializers import ProductSerializer, ManufactureSerializer, ComparisonZoneSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ManufactureViewSet(viewsets.ModelViewSet):
    queryset = Manufacture.objects.all()
    serializer_class = ManufactureSerializer

class ComparisonZoneViewSet(viewsets.ModelViewSet):
    queryset = ComparisonZone.objects.all()
    serializer_class = ComparisonZoneSerializer

