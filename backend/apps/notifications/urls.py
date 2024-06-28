from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'notifications', views.NotificationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('unread-notifications/', views.UnreadNotificationsViewSet.as_view({'get': 'list'}),
         name='unread-notifications'),
    path('higher-ranked-notification/<int:pk>/',
         views.HigherRankedProductsView.as_view(), name='higher-ranked-notification-detail'),

]
