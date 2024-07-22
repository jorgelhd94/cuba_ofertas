from rest_framework.views import APIView
from rest_framework.response import Response
from apps.integrations.models import TKC_Credentials
from apps.integrations.tkc.tkc_integration import tkc_initial_configuration
from apps.integrations.tkc.tkc_config import tkc_base_url
from rest_framework import status


class TKCTestView(APIView):
    def get(self, request):
        credentials = TKC_Credentials.objects.all().first()

        if not credentials:
            return Response({"error": "No credentials found"}, status=status.HTTP_400_BAD_REQUEST)
        
        response_data = tkc_initial_configuration(
            base_url=tkc_base_url, credentials=credentials)
        
        return Response(response_data, status=status.HTTP_200_OK)
