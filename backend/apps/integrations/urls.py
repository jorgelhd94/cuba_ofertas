from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# router = DefaultRouter()
# router.register(r'products', views.ProductViewSet)

urlpatterns = [
    #     path('', include(router.urls)),
    path('tkc-test/',
         views.TKCTestView.as_view(), name='tkc-test'),
]
