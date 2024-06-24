from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ManufactureViewSet, ProviderViewSet, CategoryViewSet, ProductRankView

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'manufactures', ManufactureViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'providers', ProviderViewSet)
# router.register(r'comparison_zones', ComparisonZoneViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('product-ranking/<int:product_id>/',
         ProductRankView.as_view(), name='product-ranking'),
]
