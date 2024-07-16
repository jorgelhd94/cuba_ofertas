from rest_framework.views import APIView
from rest_framework.response import Response
from apps.integrations.tkc.tkc_integration import test_tkc
from rest_framework import status


class TKCTestView(APIView):
    def get(self, request):
        response_data = test_tkc()
        return Response(response_data, status=status.HTTP_200_OK)
