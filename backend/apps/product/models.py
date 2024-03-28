from django.db import models, IntegrityError

class Manufacture(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=True)
    url = models.CharField(max_length=255, null=True)

    class Meta:
        db_table = 'manufacture'


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    manufacture_id = models.ForeignKey(Manufacture, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True)
    product_url = models.CharField(max_length=255, null=True)
    image_url = models.CharField(max_length=255, null=True)
    current_price = models.FloatField(null=True)
    currency = models.CharField(max_length=255, null=True)
    price_by_weight = models.FloatField(null=True)
    currency_by_weight = models.CharField(max_length=255, null=True)

    class Meta:
        db_table = 'product'
        indexes = [
            models.Index(fields=['manufacture_id'], name='product_FK'),
        ]


class ComparisonZone(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(null=True)
    main_product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='main_comparison_zones')
    comparison_products = models.ManyToManyField(Product, related_name='comparison_zones')

    class Meta:
        db_table = 'comparison_zone'

    def save(self, *args, **kwargs):
        if self.main_product in self.comparison_products.all():
            raise IntegrityError("El producto principal no puede estar en la lista de productos de comparación.")
        super().save(*args, **kwargs)

