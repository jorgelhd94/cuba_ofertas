from apps.product.models import Product
from apps.product.serializers import ProductSerializer
from django.utils import timezone


def test_set_previous_price_updated_at():
    product_id = '140288'
    name = 'Salsa de soja Vima Foods (1750 ml)'

    product_defaults = {
        'name': name,
        'current_price': 0.99
    }

    try:
        # Intenta obtener el producto existente
        product = Product.objects.get(product_id=product_id)

        if product.current_price != product_defaults["current_price"]:
            product_defaults["previous_price_updated_at"] = timezone.now()
            product_defaults["previous_price"] = product.current_price
            
        # Actualiza los campos del producto con los valores de product_defaults
        for key, value in product_defaults.items():
            setattr(product, key, value)
        # Guarda el producto actualizado
        product.save()
    except Product.DoesNotExist:
        # Crea un nuevo producto con los valores de product_defaults
        product_defaults['product_id'] = product_id
        product = Product.objects.create(**product_defaults)

    productSerializer = ProductSerializer(product)

    return productSerializer
