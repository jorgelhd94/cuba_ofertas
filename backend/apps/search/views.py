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
order_mapping = {
    'default': 'id',               # Sin ordenar
    'less_price': 'current_price',     # Menor precio
    'higher_price': '-current_price',    # Mayor precio
    'new': '-created_at',       # Más nuevo
    'less_price_by_weight': 'price_by_weight'    # Menor precio/lb
}

def get_valid_page(request, query_params, paginator, products_queryset_count):
     # Validar página proporcionada
    page_number = query_params.get(paginator.page_query_param, 1)
    page_number = int(page_number) if page_number.isdigit() and int(page_number) > 0 else 1
    page_size = paginator.get_page_size(request)
    total_items = products_queryset_count
    total_pages = (total_items + page_size - 1) // page_size

    if page_number > total_pages:
        return 1
    
    return page_number
        

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
            products_queryset = products_queryset.order_by(order_mapping.get(orderby, 'id'))

            # Mode
            if mode == 'combo':
                products_queryset = products_queryset.filter(categories__name='Combos')
            elif mode == 'simple':
                products_queryset = products_queryset.exclude(categories__name='Combos')
            
            # Paginación
            paginator = PageNumberPagination()

             # Validar página proporcionada
            page_number = get_valid_page(request, query_params, paginator, products_queryset.count())

            request.query_params._mutable = True
            request.query_params[paginator.page_query_param] = str(page_number)
            request.query_params._mutable = False

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