from django.utils import timezone
from apps.product.models import CategoryShop, Manufacture, Product, Provider


def create_product(product, shop):
    base_product_url = "https://www.tuambia.com/catalog"
    image_base_url = 'https://medias.treew.com/imgproducts/thumbs'
    
    product_id = product.get("id")
    product_name = product.get("name")
    product_slug = product.get("slug")
    product_url = f'{base_product_url}/{product_slug}'
    product_images = product.get("media")
    product_image_url = None
    if len(product_images) > 0:
        product_image_url = product_images[0]["url"]     
    product_currency = 'US$'
    product_old_price = product.get("price")
    external_current_price = product.get("finalPrice")
    new_product = {
        'name': product_name,
        'product_id': product_id,
        'product_url': product_url,
        'image_url': product_image_url,
        'currency': product_currency,
        'old_price': product_old_price,
        'shop': shop,
        'updated_at': timezone.now(),
    }
    try:
        product = Product.objects.get(product_id=product_id, shop=shop)
        
        str_current_price = str(product.current_price)
        if str_current_price != external_current_price:
            product.previous_price_updated_at = timezone.now()
            product.previous_price = product.current_price
            product.current_price = external_current_price
            
        # Actualiza los campos del producto con los valores de new_product
        for key, value in new_product.items():
            setattr(product, key, value)
            
        # Guarda el producto actualizado
        product.save()
        
    except Product.DoesNotExist:
        new_product["current_price"] = external_current_price
        product = Product.objects.create(**new_product)      

    