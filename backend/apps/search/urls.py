from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.SearchView.as_view(), name='search'),
    path('update-database/', views.UpdateDatabaseView.as_view(), name='update-database'),
    path('test-auth/', views.TestAuthView.as_view(), name='test-auth'),
]