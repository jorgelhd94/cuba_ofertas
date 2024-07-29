from rest_framework import serializers
from .models import ProductsUpdateLogs

class ProductsUpdateLogsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductsUpdateLogs
        fields = '__all__'
        read_only_fields = ['start_time', 'end_time', 'status', 'note', 'updated_products_count', 'deleted_products_count', 'new_products_count']
