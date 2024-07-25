import requests
from .utils import update_category, update_manufacture, update_provider, create_product


def update_products(headers, shop, proxy=None):
    url = "https://apitreewsearchengine.treew.com/products"
    
    print("Starting to fetch products from Supermarket 23...")
    try:
        manufactures = []
        providers = []
          
        first_response = requests.get(url, headers=headers, params={"limit": "1"})
        
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
                    product_manufacture, manufactures = update_manufacture(product, manufactures, shop)
                    
                    # Providers
                    product_provider, providers = update_provider(product, providers, shop)
                    
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
                    create_product(product, shop, product_manufacture, product_provider, product_category)
                    
                print("------SM23 Products process completed successfully------")
            else:
                print(f"Failed to fetch products. Status code: {response.status_code}")  
                       
    except Exception as e:
        print(f"An error occurred: {e}")
        raise Exception(e)
    