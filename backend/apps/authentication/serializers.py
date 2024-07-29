from rest_framework import serializers
from django.contrib.auth.models import User

class CustomUserDetailsSerializer(serializers.ModelSerializer):
    groups = serializers.StringRelatedField(many=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'groups')
