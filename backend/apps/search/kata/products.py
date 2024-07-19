import requests
from apps.product.models import CategoryShop, Shop
from common.utils.categories_functions import get_category_data
from django.core.exceptions import ObjectDoesNotExist
from .zones import fetch_zones

def update_products(headers, proxy=None):    
    # if proxy:
        #     response = requests.get(url, proxies={
        #     "http": proxy,
        #     "https": proxy
        #     })
        # else:
        #     response = requests.get(url)
        
    zone_ids = fetch_zones(headers)
    
    url = "https://api.katapulk.com/api/v2/storefront/products"  
    
    params = {
        "per_page": "100",
    }
    
    all_products = []
    
    print("Starting to fetch products...")
    try:    
        # Get all products for each zone
        for zone in zone_ids:
            params["zone_id"] = zone
            params["page"] = 1
            
            first_response = requests.get(url, headers=headers, params=params)
        
            product_list = []
            
            if first_response.status_code == 200:
                products_data = first_response.json().get('data')
                products_meta= first_response.json().get('meta')
                product_list.extend(products_data)
                
                total_pages = products_meta.get('total_pages')
                # product_count_per_page = len(product_list)
                # total_count = first_response.json().get('meta')["total_count"]
                
                # print(f"Total pages {total_pages}----")
                # print(f"Total count {total_count}-----------------")
                
                #Looping to get all data from all pages 
                if total_pages > 1:
                    for page_number in range(2, total_pages + 1):
                        # print(f"Page number {page_number}")
                        params["page"] = page_number
                        response = requests.get(url, headers=headers, params=params)
                        if response.status_code == 200:
                            products_page_data = response.json().get('data')
                            product_list.extend(products_page_data)
                            # product_count_per_page += len(products_page_data)
                # print(f"Product list for zone {zone}: {len(product_list)}")
            else:
                print(f"Failed to fetch products. Status code: {first_response.status_code}")    
                
            all_products.extend(product_list)
            
        # print(f"Length All Products {len(all_products)}")
        
        return len(all_products)
        
    except Exception as e:
        print(f"An error occurred: {e}")
        
    return None