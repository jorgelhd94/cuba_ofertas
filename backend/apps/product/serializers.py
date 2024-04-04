from rest_framework import serializers
from .models import Product, Manufacture, ComparisonZone

class ManufactureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacture
        fields = ['id', 'name', 'url']

class ProductSerializer(serializers.ModelSerializer):
    manufacture = ManufactureSerializer()

    class Meta:
        model = Product
        fields = ['id', 'product_id', 'manufacture', 'name', 'product_url', 'image_url', 'current_price', 'currency', 'price_by_weight', 'currency_by_weight']
    
    def create(self, validated_data):
        manufacture_data = validated_data.pop('manufacture')

        manufacture, created = Manufacture.objects.get_or_create(**manufacture_data)
        product, created = Product.objects.get_or_create(manufacture=manufacture, **validated_data)
        
        return product


class ComparisonZoneSerializer(serializers.ModelSerializer):
    main_product = ProductSerializer()
    comparison_products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = ComparisonZone
        fields = ['id', 'name', 'created_at', 'main_product', 'comparison_products']
    
    def create(self, validated_data):
        main_product_data = validated_data.pop('main_product')
        manufacture_data = main_product_data.pop('manufacture')

        manufacture, created = Manufacture.objects.get_or_create(**manufacture_data)
        main_product, created = Product.objects.get_or_create(manufacture=manufacture, **main_product_data)
        
        comparisonZone = ComparisonZone.objects.create(main_product=main_product, **validated_data)
        return comparisonZone
