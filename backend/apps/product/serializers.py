from rest_framework import serializers
from .models import Product, Manufacture, ComparisonZone, Provider, Category

class ManufactureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manufacture
        fields = ['id', 'name', 'url']

class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = ['id', 'name', 'url']

class CategorySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'category_id', 'name', 'url', 'children']

    def get_children(self, obj):
        children = obj.children.all()
        return CategorySerializer(children, many=True).data

class ProductSerializer(serializers.ModelSerializer):
    manufacture = ManufactureSerializer()
    categories = CategorySerializer(many=True)
    provider = ProviderSerializer()

    class Meta:
        model = Product
        fields = '__all__'
    
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
