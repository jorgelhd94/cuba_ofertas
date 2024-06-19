from rest_framework import serializers
from .models import Product, Manufacture, ComparisonZone, Provider, Category, Shop

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ['id', 'name', 'url', 'slug']

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
    manufacture = ManufactureSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    provider = ProviderSerializer(read_only=True)
    shop = ShopSerializer(read_only=True)

    class Meta:
        model = Product
        fields = '__all__'


class ComparisonZoneSerializer(serializers.ModelSerializer):
    main_product = ProductSerializer()
    comparison_products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = ComparisonZone
        fields = ['id', 'name', 'created_at', 'main_product', 'comparison_products']
    
    def create(self, validated_data):
        main_product_data = validated_data.pop('main_product')

        product = Product.objects.get(product_id=main_product_data["product_id"])
        
        comparisonZone = ComparisonZone.objects.create(main_product=product, **validated_data)
        return comparisonZone
