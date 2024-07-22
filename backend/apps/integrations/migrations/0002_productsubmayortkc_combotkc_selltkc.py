# Generated by Django 5.0.3 on 2024-07-22 16:13

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('integrations', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductSubmayorTKC',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('categoria_online', models.CharField(max_length=255)),
                ('idTienda', models.CharField(max_length=255)),
                ('codigo', models.CharField(max_length=255)),
                ('nombre', models.CharField(max_length=255)),
                ('suministrador', models.CharField(max_length=255)),
                ('unidad_medida', models.CharField(max_length=50)),
                ('existencia_fisica', models.DecimalField(decimal_places=2, max_digits=10)),
                ('almacen', models.CharField(max_length=255)),
                ('tienda', models.CharField(max_length=255)),
                ('user_tkc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products_tkc', to='integrations.tkc_credentials')),
            ],
        ),
        migrations.CreateModel(
            name='ComboTKC',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_producto_tienda', models.CharField(max_length=255)),
                ('codigo_producto', models.CharField(max_length=255)),
                ('nombre_producto', models.CharField(max_length=255)),
                ('nombre_almacen', models.CharField(max_length=255)),
                ('total_producto', models.DecimalField(decimal_places=2, max_digits=10)),
                ('tienda', models.CharField(max_length=255)),
                ('peso', models.DecimalField(decimal_places=2, max_digits=10)),
                ('pv', models.DecimalField(decimal_places=2, max_digits=10)),
                ('user_tkc', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='combos_tkc', to='integrations.tkc_credentials')),
                ('childrens', models.ManyToManyField(related_name='combos', to='integrations.productsubmayortkc')),
            ],
        ),
        migrations.CreateModel(
            name='SellTKC',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('sell_date', models.DateField()),
                ('id_tienda', models.CharField(max_length=255)),
                ('categoria_online', models.CharField(max_length=255)),
                ('codigo', models.CharField(max_length=255)),
                ('nombre', models.CharField(max_length=255)),
                ('suministrador', models.CharField(max_length=255)),
                ('unidad_medida', models.CharField(max_length=50)),
                ('existencia', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_vendido', models.DecimalField(decimal_places=2, max_digits=10)),
                ('precio_prov', models.DecimalField(decimal_places=2, max_digits=10)),
                ('importe', models.DecimalField(decimal_places=2, max_digits=10)),
                ('precio_venta', models.DecimalField(decimal_places=2, max_digits=10)),
                ('combo_tkc', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sell_tkcs', to='integrations.combotkc')),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sell_tkcs', to=settings.AUTH_USER_MODEL)),
                ('product_submayor_tkc', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sell_tkcs', to='integrations.productsubmayortkc')),
            ],
        ),
    ]
