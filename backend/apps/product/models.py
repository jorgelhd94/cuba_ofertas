from django.db import models
from django.utils import timezone
from django.utils.text import slugify


class Shop(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField(max_length=200)
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Manufacture(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=True)
    url = models.CharField(max_length=255, null=True)
    shop = models.ForeignKey(
        Shop, on_delete=models.CASCADE, null=True, related_name='manufacture_shops')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'manufacture'


class Provider(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=True)
    url = models.CharField(max_length=255, null=True)
    shop = models.ForeignKey(
        Shop, on_delete=models.CASCADE, null=True, related_name='provider_shops')
    provider_id = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'provider'

class CategoryBaseModel(models.Model):
    category_id = models.CharField(max_length=255)
    name = models.CharField(max_length=255, null=True)
    url = models.CharField(max_length=255, null=True)
    parent = models.ForeignKey(
        'self', null=True, blank=True, related_name='children', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True 

    def __str__(self):
        return self.name

    def get_descendants(self, include_self=False):
        descendants = []
        if include_self:
            descendants.append(self)

        children = self.children.all()
        for child in children:
            descendants.extend(child.get_descendants(include_self=True))
        return descendants

    def get_ancestors(self, include_self=False):
        ancestors = []
        current = self if include_self else self.parent
        while current is not None:
            ancestors.append(current)
            current = current.parent
        return ancestors
    
class Category(CategoryBaseModel):
    id = models.AutoField(primary_key=True)

    class Meta:
        db_table = 'category'
        abstract = False 
    
class CategoryShop(CategoryBaseModel):
    id = models.AutoField(primary_key=True)
    shop = models.ForeignKey(
        Shop, on_delete=models.CASCADE, null=True, related_name='category_shops')

    class Meta:
        db_table = 'category_shop'
        abstract = False


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    product_id = models.CharField(max_length=255)

    shop = models.ForeignKey(
        Shop, on_delete=models.CASCADE, null=True, related_name='products')
    manufacture = models.ForeignKey(
        Manufacture, on_delete=models.CASCADE, null=True)
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, null=True)
    categories = models.ManyToManyField(Category, related_name='products')
    categories_shop = models.ManyToManyField(CategoryShop, related_name='products_shop')
    name = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
    product_url = models.CharField(max_length=900, null=True)
    image_url = models.CharField(max_length=255, null=True)

    current_price = models.FloatField(null=True)
    currency = models.CharField(max_length=255, null=True)

    previous_price = models.FloatField(null=True)
    previous_price_updated_at = models.DateTimeField(null=True)

    old_price = models.FloatField(null=True, blank=True)

    price_by_weight = models.FloatField(null=True)
    currency_by_weight = models.CharField(max_length=255, null=True)
    previous_price_by_weight = models.FloatField(null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'product'
        indexes = [
            models.Index(fields=['manufacture'], name='product_FK'),
        ]

    def save(self, *args, **kwargs):
        super(Product, self).save(*args, **kwargs)

        # Check if there's already a PriceHistory for today
        today = timezone.now().date()
        existing_history = PriceHistory.objects.filter(
            product=self, date__date=today).first()

        if existing_history:
            existing_history.price = self.current_price
            existing_history.save()
        else:
            PriceHistory.objects.create(product=self, price=self.current_price)


class PriceHistory(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='price_history')
    date = models.DateTimeField(auto_now_add=True)
    price = models.FloatField()

    class Meta:
        db_table = 'price_history'
        ordering = ['-date']


class ComparisonZone(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=True, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    main_product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='main_comparison_zones')
    comparison_products = models.ManyToManyField(
        Product, related_name='comparison_zones')

    class Meta:
        db_table = 'comparison_zone'
