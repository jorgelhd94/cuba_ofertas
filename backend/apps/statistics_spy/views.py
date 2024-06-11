from rest_framework import viewsets
from .models import ProductsUpdateLogs
from .serializers import ProductsUpdateLogsSerializer

class ProductsUpdateLogsViewSet(viewsets.ModelViewSet):
    queryset = ProductsUpdateLogs.objects.all()
    serializer_class = ProductsUpdateLogsSerializer

