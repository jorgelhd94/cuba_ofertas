import requests
from .utils import fetch_zones, process_products

    
def update_products(headers, shop, proxy=None):    
        
    zone_ids = fetch_zones(headers)
    
    url = "https://api.katapulk.com/api/v2/storefront/products"  
    
    params = {
        "per_page": "100",
        "include": "images",
        "image_transformation[size]": "600"
    }
    
    products_id = []
    all_products = []
    
    print("Starting to fetch products...")
    try:    
        # Get all products for each zone
        for zone in zone_ids:
            params["zone_id"] = zone
            params["page"] = 1
            
            first_response = requests.get(url, headers=headers, params=params)
        
            product_list = []
            
            # Getting first page to obtain products metadata
            if first_response.status_code == 200:
                products_full_data = first_response.json()
                products_data = products_full_data.get('data')
                images = products_full_data["included"]
                print(f"Processing products from zone with id {zone} and page 1")
                product_result = process_products(products_data, products_id, images, shop)
                products_meta = first_response.json().get('meta')
                products_id = product_result['products_id']
                product_list.extend(product_result['products'])
                
                total_pages = products_meta.get('total_pages')
                
                #Looping to get all data from all pages 
                if total_pages > 1:
                    for page_number in range(2, total_pages + 1):
                        params["page"] = page_number
                        response = requests.get(url, headers=headers, params=params)
                        if response.status_code == 200:
                            products_page_full_data = response.json().get('data')
                            products_page_full_data = response.json()
                            products_page_data = products_page_full_data.get('data')
                            images_page = products_page_full_data["included"]
                            print(f"Processing products from zone with id {zone} and page {page_number}")
                            product_page_result = process_products(products_page_data, products_id, images_page, shop)
                            products_id = product_page_result['products_id']
                            product_list.extend(product_page_result['products'])
                          
            else:
                print(f"Failed to fetch products. Status code: {first_response.status_code}")    
                
            all_products.extend(product_list)
                
        print("------Product process completed successfully------")
        
    except Exception as e:
        print(f"An error occurred: {e}")
 