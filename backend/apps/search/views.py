from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException

from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from apps.product.models import Product
from apps.product.serializers import ProductSerializer

from .tasks import update_database_sm23, test_auth


#Ordenar productos si se proporciona orderby
ORDER_MAPPING = {
    'default': 'id',               # Sin ordenar
    'less_price': 'current_price',     # Menor precio
    'higher_price': '-current_price',    # Mayor precio
    'new': '-created_at',       # Más nuevo
    'less_price_by_weight': 'price_by_weight'    # Menor precio/lb
}
        

class SearchView(APIView):
    def get(self, request):
        try:
            query_params = request.query_params
            search_text = query_params.get('q', '')
            orderby = query_params.get('orderby', 'default')
            mode = query_params.get('mode', 'show_all')

            # Filtrar productos basados en search_text
            if search_text:
                search_words = search_text.split()
                query = Q()
                for word in search_words:
                    query &= Q(name__icontains=word)

                products_queryset = Product.objects.filter(query)
            else:
                products_queryset = Product.objects.all()
            
            # Order By
            products_queryset = products_queryset.order_by(ORDER_MAPPING.get(orderby, 'id'))

            # Mode
            if mode == 'combo':
                products_queryset = products_queryset.filter(categories__name='Combos')
            elif mode == 'simple':
                products_queryset = products_queryset.exclude(categories__name='Combos')
            
            # Paginación
            paginator = PageNumberPagination()

             # Validar página proporcionada
            page = paginator.paginate_queryset(products_queryset, request)
            
            # Serializar datos de productos paginados
            serializer = ProductSerializer(page, many=True)
            
            # Retornar la respuesta paginada
            return paginator.get_paginated_response(serializer.data)
        
        except Exception as e:
            # Manejo de excepciones
            print("Ocurrió un error:", e)
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateDatabaseView(APIView):
    def get(self, request):       
        return Response({"msg": update_database_sm23()})


class TestAuthView(APIView):
    def get(self, request):     
        test_auth()  
        return Response({"msg": "Autenticacion ok"})