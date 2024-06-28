from rest_framework import viewsets
from apps.notifications.models import Notification, HigherRankedProducts
from apps.notifications.serializers import NotificationSerializer, HigherRankedProductsSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.order_by('-created_at')


class UnreadNotificationsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Notification.objects.filter(was_read=False).order_by('-created_at')
    serializer_class = NotificationSerializer
    pagination_class = None


class HigherRankedProductsView(APIView):
    def get(self, request, pk, format=None):
        # Obtener la notificación o devolver un error 404 si no existe
        notification = get_object_or_404(Notification, pk=pk)

        # Obtener todos los objetos HigherRankedProducts asociados a la notificación
        higher_ranked_products = HigherRankedProducts.objects.filter(notification=notification).order_by('main_product__name')

        # Verificar si existen productos con ranking más alto
        if not higher_ranked_products.exists():
            return Response({'error': 'HigherRankedProducts not found for the given notification'},
                            status=status.HTTP_404_NOT_FOUND)

        # Serializar los productos
        serializer = HigherRankedProductsSerializer(higher_ranked_products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


