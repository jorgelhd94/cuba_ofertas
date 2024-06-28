from rest_framework import viewsets
from apps.notifications.models import Notification
from apps.notifications.serializers import NotificationSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    http_method_names = ['get', 'head', 'options']
    pagination_class = None

    def get_queryset(self):
        return Notification.objects.filter(was_read=False).order_by('-created_at')
