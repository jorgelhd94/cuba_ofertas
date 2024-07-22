from django.db import models
from django.contrib.auth.models import User


class TKC_Credentials(models.Model):
    username = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='tkc_credentials')

    def __str__(self):
        return self.username


class ProductSubmayorTKC(models.Model):
    categoria_online = models.CharField(max_length=255)
    idTienda = models.CharField(max_length=255)
    codigo = models.CharField(max_length=255)
    nombre = models.CharField(max_length=255)
    suministrador = models.CharField(max_length=255)
    unidad_medida = models.CharField(max_length=50)
    existencia_fisica = models.DecimalField(max_digits=10, decimal_places=2)
    almacen = models.CharField(max_length=255)
    tienda = models.CharField(max_length=255)
    user_tkc = models.ForeignKey(
        TKC_Credentials, on_delete=models.CASCADE, related_name='products_tkc')

    def __str__(self):
        return self.nombre


class ComboTKC(models.Model):
    id_producto_tienda = models.CharField(max_length=255, null=True)
    codigo_producto = models.CharField(max_length=255)
    nombre_producto = models.CharField(max_length=255)
    nombre_almacen = models.CharField(max_length=255)
    total_producto = models.DecimalField(max_digits=10, decimal_places=2)
    tienda = models.CharField(max_length=255)
    peso = models.DecimalField(max_digits=10, decimal_places=2)
    pv = models.DecimalField(max_digits=10, decimal_places=2)
    user_tkc = models.ForeignKey(
        TKC_Credentials, on_delete=models.CASCADE, related_name='combos_tkc')
    childrens = models.ManyToManyField(
        ProductSubmayorTKC, through='ComboProductSubmayor', related_name='combos')

    def __str__(self):
        return self.nombre_producto


class ComboProductSubmayor(models.Model):
    combo = models.ForeignKey(ComboTKC, on_delete=models.CASCADE)
    product_submayor = models.ForeignKey(
        ProductSubmayorTKC, on_delete=models.CASCADE)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('combo', 'product_submayor')


class SellTKC(models.Model):
    sell_date = models.DateField()
    id_tienda = models.CharField(max_length=255)
    categoria_online = models.CharField(max_length=255)
    codigo = models.CharField(max_length=255)
    nombre = models.CharField(max_length=255)
    owner = models.CharField(max_length=255)
    suministrador = models.CharField(max_length=255)
    unidad_medida = models.CharField(max_length=50)
    existencia = models.DecimalField(max_digits=10, decimal_places=2)
    total_vendido = models.DecimalField(max_digits=10, decimal_places=2)
    precio_prov = models.DecimalField(max_digits=10, decimal_places=2)
    importe = models.DecimalField(max_digits=10, decimal_places=2)
    precio_venta = models.DecimalField(max_digits=10, decimal_places=2)
    combo_tkc = models.ForeignKey(
        ComboTKC, on_delete=models.CASCADE, related_name='sell_tkcs', blank=True, null=True)
    product_submayor_tkc = models.ForeignKey(
        ProductSubmayorTKC, on_delete=models.CASCADE, related_name='sell_tkcs', blank=True, null=True)

    def __str__(self):
        return self.nombre
