from rest_framework import generics
from .models import ProductsUpdateLogs
from .serializers import ProductsUpdateLogsSerializer

class ProductsUpdateLogsListAPIView(generics.ListAPIView):
    queryset = ProductsUpdateLogs.objects.all()
    serializer_class = ProductsUpdateLogsSerializer

