from django.db import models
from django.contrib.auth.models import User

class TKC_Credentials(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tkc_credentials')

    def __str__(self):
        return self.username
