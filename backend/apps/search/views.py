from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.db.models import Q, F, Value
from django.db.models.functions import Replace, Trim


from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from apps.product.models import Product
from apps.product.serializers import ProductSerializer
from common.utils.search_products import get_descendant_category_ids, get_valid_page, filter_products_by_combo_name, search_products

from .tasks import update_database_sm23, test_auth, update_providers


#Ordenar productos si se proporciona orderby
order_mapping = {
    'default': 'cleaned_name',         # Por nombre
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
            products_queryset = search_products(search_text) if search_text else Product.objects.all()

            products_queryset = products_queryset.annotate(
                cleaned_name=Trim(
                    Replace(
                        Replace(
                            Replace(F('name'), Value('\t'), Value('')),
                            Value('\r'), Value('')
                        ),
                        Value('\n'), Value(''),
                    )
                )
            )   
            
            # Order By
            products_queryset = products_queryset.order_by(order_mapping.get(orderby, 'cleaned_name'))

            # Mode
            if mode in ['combo', 'simple']:
                descendant_category_ids = get_descendant_category_ids('Combos')
                if mode == 'combo':
                    combo_name_filtered_ids = filter_products_by_combo_name(products_queryset)
                    products_queryset = products_queryset.filter(
                        Q(categories__id__in=descendant_category_ids) | Q(id__in=combo_name_filtered_ids)
                    )
                elif mode == 'simple':
                    combo_name_filtered_ids = filter_products_by_combo_name(products_queryset)
                    products_queryset = products_queryset.exclude(
                        Q(categories__id__in=descendant_category_ids) | Q(id__in=combo_name_filtered_ids)
                    )
            
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
        return Response({"msg": update_providers()})


class TestAuthView(APIView):
    def get(self, request):     
        test_auth()  
        return Response({"msg": "Autenticacion ok"})