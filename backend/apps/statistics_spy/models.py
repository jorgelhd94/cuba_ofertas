from django.db import models

# Create your models here.
class ProductsUpdateLogs(models.Model):
    STATUS_CHOICES = [
        ('processing', 'Procesando'),
        ('success', 'Éxito'),
        ('error', 'Error'),
    ]
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    note = models.TextField(blank=True, null=True)
    updated_products_count = models.IntegerField(default=0)
    deleted_products_count = models.IntegerField(default=0)
    new_products_count = models.IntegerField(default=0)
    name = models.CharField(max_length=255, null=True)

    def __str__(self):
        return f"Update started at {self.start_time} - {self.status}"