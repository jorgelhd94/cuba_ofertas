from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from apps.integrations.models import TKC_Credentials
from apps.integrations.tkc.serializers import TKC_CredentialsSerializer
from apps.integrations.tkc.tkc_integration import tkc_initial_configuration
from apps.integrations.tkc.tkc_config import tkc_base_url
from rest_framework import status, viewsets, permissions, generics
from apps.authentication import permissions as auth_permissions


class TKCCredentialsViewSet(viewsets.ModelViewSet):
    queryset = TKC_Credentials.objects.all()
    serializer_class = TKC_CredentialsSerializer
    permission_classes = [
        auth_permissions.ORPermissions.with_perms(
            permissions.IsAdminUser,
            auth_permissions.IsClient
        )
    ]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return TKC_Credentials.objects.all()
        return TKC_Credentials.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        user = request.user
        if not user.is_staff and TKC_Credentials.objects.filter(user=user).exists():
            return Response({"detail": "You already have a credential."}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        user = request.user
        if not user.is_staff:
            # Ensure that a non-staff user can only delete their own credential
            instance = self.get_object()
            if instance.user != user:
                return Response({"detail": "You do not have permission to delete this credential."}, status=status.HTTP_403_FORBIDDEN)

        # Call the parent class's destroy method to handle the actual deletion
        return super().destroy(request, *args, **kwargs)


class UserTKCCredentialRetrieveView(generics.RetrieveAPIView):
    serializer_class = TKC_CredentialsSerializer
    permission_classes = [
        permissions.IsAuthenticated, auth_permissions.IsClient]

    def get_object(self):
        user = self.request.user
        try:
            credential = TKC_Credentials.objects.get(user=user)
        except TKC_Credentials.DoesNotExist:
            raise NotFound("No credentials found for this user.")
        return credential


class TKCTestView(APIView):
    def get(self, request):
        credentials = TKC_Credentials.objects.all().first()

        if not credentials:
            return Response({"error": "No credentials found"}, status=status.HTTP_400_BAD_REQUEST)

        response_data = tkc_initial_configuration(
            base_url=tkc_base_url, credentials=credentials)

        return Response(response_data, status=status.HTTP_200_OK)
