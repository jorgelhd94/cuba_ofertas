from django.utils import timezone
from apps.product.models import CategoryShop, Manufacture, Product, Provider

def update_category_parents(categories_list, shop):
    for category in categories_list:
        id = category.get("id")
        parent_id = category.get("parent")
        if parent_id:
            category_obj = CategoryShop.objects.get(category_id=id, shop=shop)    
            category_obj_parent = CategoryShop.objects.get(category_id=parent_id, shop=shop)   
            category_obj.parent = category_obj_parent
            category_obj.save() 
    
def update_manufacture(product, shop):
    manufacture = None
    manufacture_name = product.get("brand")
    if manufacture_name and manufacture_name != '-':
        # manufacture_url = ''
        new_manufacture = {
                "name": manufacture_name
            }
        try:
            manufacture = Manufacture.objects.get(name=manufacture_name, shop=shop)                           
            for key, value in new_manufacture.items():
                setattr(manufacture, key, value)
            manufacture.save()
        except Manufacture.DoesNotExist:
            new_manufacture["shop"] = shop
            manufacture = Manufacture.objects.create(**new_manufacture)
            
    return manufacture

def update_provider(product, shop):
    provider = None
    provider_id = product.get("productProvider")
    if provider_id:
        new_provider = {
            "provider_id": provider_id
        }
        provider_name = product.get("codeProductProvider")
        if provider_name:
            new_provider["name"] = provider_name
        try:
            provider = Provider.objects.get(provider_id=provider_id, shop=shop)                           
            for key, value in new_provider.items():
                setattr(provider, key, value)
            provider.save()
        except Provider.DoesNotExist:
            new_provider["shop"] = shop
            provider = Provider.objects.create(**new_provider)
            
    return provider

def create_product(product, shop, manufacture, provider):
    base_product_url = "https://www.tuambia.com/catalog"
    
    product_id = product.get("id")
    product_name = product.get("name")
    product_description = product.get("description")
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
        'description': product_description,
        'product_id': product_id,
        'product_url': product_url,
        'image_url': product_image_url,
        'currency': product_currency,
        'old_price': product_old_price,
        'manufacture': manufacture,
        'provider': provider,
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

    