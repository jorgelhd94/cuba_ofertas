from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from common.configuration.pagination import StandardResultsSetPagination
from apps.product.models import Category, Product, Provider
from apps.product.serializers import ProductSerializer
from common.utils import search_functions

from .tasks import update_database_sm23, test_auth, update_providers


class SearchView(APIView):
    def get(self, request):
        try:
            query_params = request.query_params

            products_queryset = search_functions.get_product_queryset(
                query_params
            )

            paginator = StandardResultsSetPagination()

            # Validate page
            page_number = search_functions.get_valid_page(
                request, query_params, paginator, products_queryset.count())

            request.query_params._mutable = True
            request.query_params[paginator.page_query_param] = str(page_number)
            request.query_params._mutable = False

            page = paginator.paginate_queryset(products_queryset, request)

            serializer = ProductSerializer(page, many=True)

            return paginator.get_paginated_response(serializer.data)

        except Exception as e:
            print("Ocurrió un error:", e)
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateDatabaseView(APIView):
    def get(self, request):
        update_database_sm23()
        return Response({"msg": "ok"})


class TestAuthView(APIView):
    def get(self, request):
        test_auth()
        return Response({"msg": "Autenticacion ok"})
