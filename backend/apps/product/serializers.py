from rest_framework import serializers
from .models import Product, Manufacture, ComparisonZone

class ManufactureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacture
        fields = ['id', 'name', 'url']

class ProductSerializer(serializers.ModelSerializer):
    manufacture = ManufactureSerializer(read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'manufacture', 'name', 'product_url', 'image_url', 'current_price', 'currency', 'price_by_weight', 'currency_by_weight']

class ComparisonZoneSerializer(serializers.ModelSerializer):
    main_product = ProductSerializer(read_only=True)
    comparison_products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = ComparisonZone
        fields = ['id', 'name', 'created_at', 'main_product', 'comparison_products']
