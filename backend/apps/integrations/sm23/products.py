import requests
from apps.product.models import Manufacture, Provider
from .utils import update_category

def update_products(headers, shop, proxy=None):
    url = "https://apitreewsearchengine.treew.com/products"
    
    print("Starting to fetch products from Supermarket 23...")
    try:
        manufactures = []
        providers = []
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
                    print("------SM23 manufactures created successfully------")
                    # Providers
                    # provider_name = product.get("ProviderName")
                    # if provider_name:
                    #     provider_id = product.get("ProviderId")
                    #     providers, provider_added = add_if_no_exists(provider_name, providers)
                    #     if provider_added:
                    #         provider_url = f"https://www.supermarket23.com/es/productos/proveedor?q={provider_name}"
                    #         new_provider = {
                    #                 "name": provider_name,
                    #                 "url": provider_url,
                    #                 "provider_id": provider_id,
                    #                 "shop": shop
                    #             }
                    #         Provider.objects.update_or_create(
                    #             name=provider_name,
                    #             shop=shop,
                    #             defaults=new_provider
                    #         )
                    print("------SM23 providers created successfully------")
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
                    update_category(category, shop) 
                    print("------SM23 categories created successfully------")
            else:
                print(f"Failed to fetch products. Status code: {response.status_code}")  
                       
            print("------SM23 Products process completed successfully------")
    except Exception as e:
        print(f"An error occurred: {e}")
        raise Exception(e)
    