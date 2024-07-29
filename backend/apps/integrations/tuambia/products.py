import requests

from .utils import create_product

def update_products(headers, shop, proxy=None):
    url = "https://api.tuambia.com/ms-auth/api/products/visibles"

    page = 1 
    products = []
    products_per_page = []
    payload = { "size": 100, "page": page }
    
    print("Starting to fetch products from TuAmbia...")
    try:
        # First Page
        first_response = requests.post(url, headers=headers, data=payload)
        print(f"Processing products from page {page}")
        if first_response.status_code == 200:
            products_per_page = first_response.json()
            # products.extend(products_per_page)
            for product in products_per_page:
                create_product(product, shop) 
            
            # Other Pages    
            while len(products_per_page) > 0:
                page += 1
                print(f"Processing products from page {page}")
                payload["page"] = page
                response = requests.post(url, headers=headers, data=payload)
                if response.status_code == 200:
                    products_per_page = response.json()
                    for product in products_per_page:
                        create_product(product, shop)
                    # products.extend(products_per_page)
                else:
                    print(f"Failed to fetch products from page {page}. Status code: {response.status_code}")
        else:
            print(f"Failed to fetch products from page {page}. Status code: {response.status_code}")   
               
        print(f"Products count: {len(products)}")  
        # return products           
    except Exception as e:
        print(f"An error occurred: {e}")
        raise Exception(e)
    