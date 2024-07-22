from rest_framework import serializers
from django.contrib.auth.models import User
from ..models import TKC_Credentials, ProductSubmayorTKC, ComboTKC, SellTKC


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class TKC_CredentialsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = TKC_Credentials
        fields = ['id', 'username', 'password', 'user']

    def create(self, validated_data):
        request = self.context.get('request', None)
        if request is not None:
            user = request.user
            validated_data['user'] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        request = self.context.get('request', None)
        if request is not None:
            user = request.user
            validated_data['user'] = user
        return super().update(instance, validated_data)


class ProductSubmayorTKCSerializer(serializers.ModelSerializer):
    user_tkc = TKC_CredentialsSerializer()

    class Meta:
        model = ProductSubmayorTKC
        fields = ['id', 'categoria_online', 'idTienda', 'codigo', 'nombre', 'suministrador',
                  'unidad_medida', 'existencia_fisica', 'almacen', 'tienda', 'user_tkc']


class ComboTKCSerializer(serializers.ModelSerializer):
    user_tkc = TKC_CredentialsSerializer()
    childrens = ProductSubmayorTKCSerializer(many=True)

    class Meta:
        model = ComboTKC
        fields = ['id_producto_tienda', 'codigo_producto', 'nombre_producto',
                  'nombre_almacen', 'total_producto', 'tienda', 'peso', 'pv', 'user_tkc', 'childrens']


class SellTKCSerializer(serializers.ModelSerializer):
    owner = UserSerializer()
    combo_tkc = ComboTKCSerializer()
    product_submayor_tkc = ProductSubmayorTKCSerializer()

    class Meta:
        model = SellTKC
        fields = ['id', 'sell_date', 'id_tienda', 'categoria_online', 'codigo', 'nombre', 'owner', 'suministrador', 'unidad_medida',
                  'existencia', 'total_vendido', 'precio_prov', 'importe', 'precio_venta', 'combo_tkc', 'product_submayor_tkc']


class SimpleSellTKCSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()
    combo_tkc = serializers.PrimaryKeyRelatedField(
        queryset=ComboTKC.objects.all(), allow_null=True)
    product_submayor_tkc = serializers.PrimaryKeyRelatedField(
        queryset=ProductSubmayorTKC.objects.all(), allow_null=True)

    class Meta:
        model = SellTKC
        fields = ['id', 'sell_date', 'id_tienda', 'categoria_online', 'codigo', 'nombre', 'owner', 'suministrador', 'unidad_medida',
                  'existencia', 'total_vendido', 'precio_prov', 'importe', 'precio_venta', 'combo_tkc', 'product_submayor_tkc']
