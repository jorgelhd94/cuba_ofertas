import requests

from apps.product.models import Manufacture, Provider

def add_if_no_exists(item, item_list):
    new_list = item_list
    added = False
    if item not in item_list:
        new_list.append(item)
        added = True
    return new_list, added

def update_products(headers, shop, proxy=None):
    url = "https://apitreewsearchengine.treew.com/products"
    
    print("Starting to fetch products from Supermarket 23...")
    try:
        manufactures = []
        providers = []
        categories = []
        products_id = []  
          
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
                
                for product in products:
                    # Manufactures
                    # manufacture_name = product.get("Brand")
                    # if manufacture_name:
                    #     manufactures, manufacture_added = add_if_no_exists(manufacture_name, manufactures)
                    #     if manufacture_added:
                    #         manufacture_url = f"https://www.supermarket23.com/es/productos/bp?q={manufacture_name}"
                    #         new_manufacture = {
                    #                 "name": manufacture_name,
                    #                 "url": manufacture_url,
                    #                 "shop": shop
                    #             }
                    #         Manufacture.objects.update_or_create(
                    #             name=manufacture_name,
                    #             shop=shop,
                    #             defaults=new_manufacture
                    #         )
                    # Providers
                    provider_name = product.get("ProviderName")
                    if provider_name:
                        provider_id = product.get("ProviderId")
                        providers, provider_added = add_if_no_exists(provider_name, providers)
                        if provider_added:
                            provider_url = f"https://www.supermarket23.com/es/productos/proveedor?q={provider_name}"
                            new_provider = {
                                    "name": provider_name,
                                    "url": provider_url,
                                    "provider_id": provider_id,
                                    "shop": shop
                                }
                            Provider.objects.update_or_create(
                                name=provider_name,
                                shop=shop,
                                defaults=new_provider
                            )
                    # Categories
                    category_id = product.get("CategoryId")
                    category_name = product.get("SpaCategoryName")    
                print(len(products))    
                print("------Products sm23 process completed successfully------")
            else:
                print(f"Failed to fetch providers. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")
    
    pass