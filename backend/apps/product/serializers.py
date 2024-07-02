from rest_framework import serializers
from .models import Product, Manufacture, ComparisonZone, Provider, Category, Shop, PriceHistory
from apps.statistics_spy.models import ProductsUpdateLogs
from datetime import timedelta
from django.utils import timezone


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
    products_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'category_id', 'name',
                  'url', 'children', 'products_count']

    def get_children(self, obj):
        children = obj.children.all()
        return CategorySerializer(children, many=True).data

    def get_products_count(self, obj):
        # Si la categoría no tiene hijos, contar los productos directamente
        if not obj.children.exists():
            return obj.products.count()

        # Si la categoría tiene hijos, sumar los productos de todos los descendientes
        count = 0
        descendants = obj.get_descendants()
        for descendant in descendants:
            count += descendant.products.count()
        return count


class ProductSerializer(serializers.ModelSerializer):
    manufacture = ManufactureSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    provider = ProviderSerializer(read_only=True)
    shop = ShopSerializer(read_only=True)
    days_since_last_update = serializers.SerializerMethodField()
    days_on_sale = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_days_since_last_update(self, obj):
        # Obtener la última actualización exitosa
        last_update = ProductsUpdateLogs.objects.filter(
            status='success').order_by('-end_time').first()
        if last_update:
            # Calcular la diferencia en días entre la fecha de actualización del producto y la última actualización
            time_difference = last_update.start_time.date() - obj.updated_at.date()
            return time_difference.days
        return None

    def get_days_on_sale(self, obj):
        start_date = timezone.now() - timedelta(days=35)
        price_history = obj.price_history.filter(
            date__gte=start_date).order_by('-date')

        if not price_history.exists():
            return None

        current_price = obj.current_price
        last_price_change = None
        price_set_date = None

        for record in price_history:
            if record.price == current_price:
                price_set_date = record.date

            if record.price != current_price:
                last_price_change = record
                break

        if last_price_change is None or current_price >= last_price_change.price:
            return None

        if price_set_date is None:
            return None

        days_on_sale = (timezone.now().date() - price_set_date.date()).days
        return days_on_sale


class PriceHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PriceHistory
        fields = ['id', 'product', 'date', 'price']


class ComparisonZoneSerializer(serializers.ModelSerializer):
    main_product = ProductSerializer()
    comparison_products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = ComparisonZone
        fields = ['id', 'name', 'created_at',
                  'main_product', 'comparison_products']

    def create(self, validated_data):
        main_product_data = validated_data.pop('main_product')

        product = Product.objects.get(
            product_id=main_product_data["product_id"])

        comparisonZone = ComparisonZone.objects.create(
            main_product=product, **validated_data)
        return comparisonZone
