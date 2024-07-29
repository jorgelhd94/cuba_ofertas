import requests

from .utils import create_product

def update_products(headers, shop, proxy=None):
    url = "https://api.tuambia.com/ms-auth/api/products/search/"

    
    products_total = []
    products_per_page = []
    payload = {
        "size": 100, "page": 1
    }
    
    print("Starting to fetch products from TuAmbia...")
    try:
        # First Page
        print(f"Processing products from page 1")
        first_response = requests.post(url, headers=headers, data=payload)
        if first_response.status_code == 200:
            total_count = first_response.headers.get('X-Total-Count')
            total_pages = int(int(total_count) / 100) + 1
            first_products = first_response.json()
            for product in first_products:
                if product.get("visible"):
                    create_product(product, shop)
                    # print(f"Processing products with name: {product.get('name')} and id {product.get('id')}")
                    # products_per_page.append(product)
            # products_total.extend(products_per_page)
                    
            # Other pages    
            for page_number in range(2, total_pages + 1):
                products_per_page = []
                payload["page"] = page_number
                print(f"Processing products from page {page_number}--------")
                response = requests.post(url, headers=headers, data=payload)
                if response.status_code == 200:
                    products = response.json()
                    for product in products:
                        if product.get("visible"):
                            create_product(product, shop)
                            # products_per_page.append(product)
                    # products_total.extend(products_per_page)
                else:
                    print(f"Failed to fetch products from page 1. Status code: {first_response.status_code}")        
        else:
            print(f"Failed to fetch products from page 1. Status code: {first_response.status_code}")   
               
        print(f"Products count: {len(products_total)}")  
        # return products           
    except Exception as e:
        print(f"An error occurred: {e}")
        raise Exception(e)
    