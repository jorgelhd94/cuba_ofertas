import requests
from django.utils import timezone
from apps.product.models import Manufacture, Product, Provider
from .utils import update_category, add_if_no_exists

def add_product_to_db():
    pass

def update_products(headers, shop, proxy=None):
    url = "https://apitreewsearchengine.treew.com/products"
    
    print("Starting to fetch products from Supermarket 23...")
    try:
        manufactures = []
        providers = []
          
        first_response = requests.get(url, headers=headers)
        
        if first_response.status_code == 200:
            total = first_response.json().get("total")
            
            params = {
                "language":"SPA",
                "limit": total
            }
            
            response = requests.get(url, headers=headers, params=params)
            
            if response.status_code == 200:
                products_data = response.json()
                products = products_data.get("products")
                
                for count, product in enumerate(products):
                    print(f"Processing product #{count+1} of {total}")
                    # Manufactures
                    manufacture_name = product.get("Brand")
                    if manufacture_name:
                        manufactures, manufacture_added = add_if_no_exists(manufacture_name, manufactures)
                        if manufacture_added:
                            manufacture_url = f"https://www.supermarket23.com/es/productos/bp?q={manufacture_name}"
                            new_manufacture = {
                                    "name": manufacture_name,
                                    "url": manufacture_url,
                                    "shop": shop
                                }
                            product_manufacture, created = Manufacture.objects.update_or_create(
                                name=manufacture_name,
                                shop=shop,
                                defaults=new_manufacture
                            )
                    # Providers
                    provider_id = product.get("ProviderId")
                    if provider_id:
                        provider_name = product.get("ProviderName")
                        providers, provider_added = add_if_no_exists(provider_id, providers)
                        if provider_added:
                            provider_url = f"https://www.supermarket23.com/es/productos/proveedor?q={provider_name}"
                            new_provider = {
                                    "name": provider_name,
                                    "url": provider_url,
                                    "provider_id": provider_id,
                                    "shop": shop
                                }
                            product_provider, created = Provider.objects.update_or_create(
                                provider_id=provider_id,
                                shop=shop,
                                defaults=new_provider
                            )
                    # Categories
                    category = {
                        'category': {
                            'category_id': product.get("CategoryId"),
                            'category_name': product.get("SpaCategoryName"),
                        },
                        'category_father': {
                            'category_id': product.get("CategoryFatherId"),
                            'category_name': product.get("SpaCategoryFatherName"),
                        },
                        'category_grandfather': {
                            'category_id': product.get("CategoryGrandFatherId"),
                            'category_name': product.get("SpaCategoryGrandFatherName"),
                        },
                        'category_greatgrandfather': {
                            'category_id': product.get("CategoryGreatGrandFatherId"),
                            'category_name': product.get("SpaCategoryGreatGrandFatherName"),
                        }   
                    }
                    product_category = update_category(category, shop) 
                    
                    #Products
                    base_product_url = "https://www.supermarket23.com/es/producto"
                    image_base_url = 'https://medias.treew.com/imgproducts/thumbs'
                    
                    product_id = product.get("ProductId")
                    product_name = product.get("SpanishName")
                    product_url = f'{base_product_url}/{product_id}'
                    product_images = product.get("Resources")
                    product_image_url = None
                    if product_images and len(product_images) > 0:
                        media_url = product_images[0]["Url"]
                        new_media_url = media_url.lstrip('~/imgproducts/')
                        product_image_url = f'{image_base_url}/{new_media_url}'
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
                print("------SM23 Products process completed successfully------")
            else:
                print(f"Failed to fetch products. Status code: {response.status_code}")  
                       
    except Exception as e:
        print(f"An error occurred: {e}")
        raise Exception(e)
    