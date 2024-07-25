from django.utils import timezone
from apps.product.models import CategoryShop, Manufacture, Product, Provider


def add_or_get_category(category_data, shop):
    category_base_url = 'https://www.supermarket23.com/es/categoria'
    try:
        category = CategoryShop.objects.get(
            category_id=category_data['category_id'],
            shop=shop
        )
        return category
    except CategoryShop.DoesNotExist:
        external_id = category_data['category_id']
        url = f'{category_base_url}/{external_id}'
        
        category = CategoryShop.objects.create(
            category_id=external_id,
            url=url,
            name=category_data['category_name'],
            shop=shop
        )
        return category
    
def update_category(category_dict, shop):
    parent = None
    grandparent = None
    greatgrandparent = None
    
    category= add_or_get_category(category_dict['category'], shop)
    
    if category_dict['category_father']['category_name'] is not None:
        parent = add_or_get_category(category_dict['category_father'], shop)
        category.parent = parent
        category.save()
        if category_dict['category_grandfather']['category_name'] is not None:
            grandparent = add_or_get_category(category_dict['category_grandfather'], shop)
            parent.parent = grandparent
            parent.save()
            if category_dict['category_greatgrandfather']['category_name'] is not None:
                grandparent = add_or_get_category(category_dict['category_greatgrandfather'], shop)
                grandparent.parent = greatgrandparent
                grandparent.save()
    
    return category

def update_manufacture(product, shop):
    manufacture = None
    manufacture_name = product.get("Brand")
    if manufacture_name:
        manufacture_url = f"https://www.supermarket23.com/es/productos/bp?q={manufacture_name}"
        new_manufacture = {
                "name": manufacture_name,
                "url": manufacture_url
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
    provider_id = product.get("ProviderId")
    if provider_id:
        new_provider = {
            "provider_id": provider_id
        }
        provider_name = product.get("ProviderName")
        if provider_name:
            provider_url = f"https://www.supermarket23.com/es/productos/proveedor?q={provider_name}"
            new_provider["url"] = provider_url
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

def create_product(product, shop, product_manufacture, product_provider, product_category):
    base_product_url = "https://www.supermarket23.com/es/producto"
    image_base_url = 'https://medias.treew.com/imgproducts/thumbs'
    
    product_id = product.get("ProductId")
    product_name = product.get("SpanishName")
    product_url = f'{base_product_url}/{product_id}'
    product_image = product.get("Image")
    product_image_url = None
    if product_image:
        product_image_url = f'{image_base_url}/{product_image}'
    product_currency = 'US$'
    product_old_price = None
    product_discount = product.get("DiscountUSD")
    if product_discount is not None:
        product_old_price = product.get("DiscountUSD")["OldPrice"]
    external_current_price = product.get("PriceUSD")
    product_price_by_weigth = None
    product_currency_by_weight = None
    currecies_sales_price = product.get("CurrenciesSalesPrice")
    price_by_weight = currecies_sales_price.get("PriceByWeight")
    if price_by_weight is not None:
        product_price_by_weigth = price_by_weight.get("PriceByLb")["PriceUSD"]
        product_currency_by_weight = 'US$/lb'
    new_product = {
        'name': product_name,
        'product_id': product_id,
        'product_url': product_url,
        'image_url': product_image_url,
        'currency': product_currency,
        'old_price': product_old_price,
        'provider': product_provider,
        'manufacture': product_manufacture,
        'currency_by_weight': product_currency_by_weight,
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
            
            if product_price_by_weigth is not None:
                product.previous_price_by_weight = product.price_by_weight
                product.price_by_weight = product_price_by_weigth                            
            
        # Actualiza los campos del producto con los valores de new_product
        for key, value in new_product.items():
            setattr(product, key, value)
            
        # Guarda el producto actualizado
        product.save()
        
    except Product.DoesNotExist:
        new_product["current_price"] = external_current_price
        if product_price_by_weigth is not None:
            new_product["price_by_weight"] = product_price_by_weigth
        product = Product.objects.create(**new_product)      

    product.categories_shop.add(product_category)
    

def add_if_no_exists(item, item_list):
    new_list = item_list
    added = False
    if item not in item_list:
        new_list.append(item)
        added = True
    return new_list, added
 
def search_duplicate_products():
    products = Product.objects.filter(shop_id=1)
    
    duplicates = []
    
    for product in products:
        cant = 0
        for p in products.exclude(pk=product.id):
            if product.product_id == p.product_id:
                cant += 1 
                duplicates.append({'product': product, 'cant': cant})
                
    return duplicates

