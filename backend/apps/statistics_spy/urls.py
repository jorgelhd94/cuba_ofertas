from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductsUpdateLogsViewSet

router = DefaultRouter()
router.register(r'update-logs', ProductsUpdateLogsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

