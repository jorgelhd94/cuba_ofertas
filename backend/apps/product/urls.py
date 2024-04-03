from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ManufactureViewSet, ComparisonZoneViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'manufactures', ManufactureViewSet)
router.register(r'comparison_zones', ComparisonZoneViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
