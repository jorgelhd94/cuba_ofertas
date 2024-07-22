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
    id = models.AutoField(primary_key=True)
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
    id_producto_tienda = models.CharField(max_length=255)
    codigo_producto = models.CharField(max_length=255)
    nombre_producto = models.CharField(max_length=255)
    nombre_almacen = models.CharField(max_length=255)
    total_producto = models.DecimalField(max_digits=10, decimal_places=2)
    tienda = models.CharField(max_length=255)
    peso = models.DecimalField(max_digits=10, decimal_places=2)
    pv = models.DecimalField(max_digits=10, decimal_places=2)
    user_tkc = models.ForeignKey(TKC_Credentials, on_delete=models.CASCADE, related_name='combos_tkc')
    childrens = models.ManyToManyField(ProductSubmayorTKC, related_name='combos')

    def __str__(self):
        return self.nombre_producto
