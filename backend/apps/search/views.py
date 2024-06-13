from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException

from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from apps.product.models import Product
from apps.product.serializers import ProductSerializer

from .tasks import update_database_sm23, test_auth

class SearchView(APIView):
    def get(self, request):
        query_params = request.query_params
        print(query_params)
        search_text = query_params.get('search_text', '')
        orderby = query_params.get('orderby', 'id')

        try:
            # Filtrar productos basados en search_text
            if search_text:
                products_queryset = Product.objects.filter(Q(name__icontains=search_text) | Q(description__icontains=search_text))
            else:
                products_queryset = Product.objects.all()
            
            # Ordenar productos
            if orderby:
                products_queryset = products_queryset.order_by(orderby)
            
            # Paginación
            paginator = PageNumberPagination()
            page = paginator.paginate_queryset(products_queryset, request)
            
            # Serializar datos de productos
            serializer = ProductSerializer(page, many=True)
            
            return paginator.get_paginated_response(serializer.data)
        
        except Exception as e:
            print("Ocurrió un error:", e)
            raise APIException({"detail": str(e)}, code=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateDatabaseView(APIView):
    def get(self, request):       
        return Response({"msg": update_database_sm23()})


class TestAuthView(APIView):
    def get(self, request):     
        test_auth()  
        return Response({"msg": "Autenticacion ok"})