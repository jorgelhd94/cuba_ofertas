from django.urls import path
from .views import ProductsUpdateLogsListAPIView

urlpatterns = [
    path('products-update-logs/', ProductsUpdateLogsListAPIView.as_view(), name='products_update_logs_list'),
]
