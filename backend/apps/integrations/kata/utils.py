import requests
from django.utils import timezone
from apps.product.models import CategoryShop, Product, Provider

def fetch_zones(headers, proxy=None):
    print("Starting to fetch zones...")
    
    
    url = "https://api.katapulk.com/api/v1/zones/zones_with_countries"  
    
    try:
        if proxy:
            response = requests.get(url, headers=headers, proxies={
            "http": proxy,
            "https": proxy
            })
        else:
            response = requests.get(url, headers=headers)
            
        if response.status_code == 200:
            zones_data = response.json()
            zones_ids = []
            for zone in zones_data.get('zones'):
                if zone.get('countries_iso')[0] == 'CU':
                    zones_ids.append(zone.get('id'))
            return zones_ids                   
        else:
            print(f"Failed to fetch zones. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")
        
def get_product_categories(product_data, shop):
    categories = product_data["relationships"]["taxons"]["data"]
    db_categories = []
    for category in categories:
        category_queryset = CategoryShop.objects.filter(
                category_id=category["id"],
                shop=shop
            )
        if category_queryset:
            db_categories.append(category_queryset[0])
    return db_categories
        
def create_product(product_data, shop):
    product_base_url = 'https://www.katapulk.com/cu/products'
    product_id = product_data["id"]
    slug = product_data["attributes"]["slug"]
    url = f'{product_base_url}/{slug}' 
    name = product_data["attributes"]["name"]
    image_url = product_data["image_url"]
    currency = product_data["attributes"]["currency"]
    external_current_price = product_data["attributes"]["price"]
    old_price = product_data["attributes"]["previous_price"]
    
    external_provider = product_data["attributes"]["store_ids"][0]
    
    provider_queryset = Provider.objects.filter(provider_id=external_provider, shop=shop)
    if len(provider_queryset) == 0:
        provider = None
    else:
        provider = provider_queryset[0]
        
    categories = get_product_categories(product_data, shop)
    
    new_product = {
            'name': name,
            'product_url': url,
            'product_id': product_id,
            'image_url': image_url,
            'currency': currency,
            'old_price': old_price,
            'shop': shop,
            'provider': provider,
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
    
    product_categories = product.categories_shop.all()
    
    for category in categories:
        if category not in product_categories:
            product.categories_shop.add(category)
            
    return product
            
def get_image_url(image_id, images_list):
    if image_id == 0:
        return 'https://www.katapulk.com/assets/imgs/product-card/no-product-image.png'
    
    image_url = ''
    for image in images_list:
        if image["id"] == image_id:
            image_urls = image["attributes"]["styles"]
            for url_data in image_urls:
                if url_data["width"] == "600" and url_data["height"] == "600":
                    image_url = url_data["url"]
                    break
    return image_url

# Procesa cada pagina de lista de productos 
# eliminando los duplicados, guardando las imagenes y añadiendolos a la base de datos 
def process_products(products, id_list, images_list, shop):
    processed_products = []
    products_id = id_list
    for product in products:
        if product['id'] not in products_id:
            id = product['id']
            products_id.append(product['id'])
            product_images = product["relationships"]["images"]["data"]
            
            if len(product_images) > 0:
                image_id = product_images[0]["id"]
            else:
                image_id = 0

            image_url = get_image_url(image_id, images_list)
            product["image_url"] = image_url
            created_product = create_product(product, shop)
            processed_products.append(created_product)
    return {'products': processed_products, 'products_id': products_id}
        