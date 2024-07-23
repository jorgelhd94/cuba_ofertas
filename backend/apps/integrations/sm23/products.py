import requests

def proccess_products():
    pass

def update_products(headers, shop, proxy=None):
    url = "https://apitreewsearchengine.treew.com/products"
    
    params = {
        "language":"SPA",
    }
    
    products_id = []
    all_products = []
    
    print("Starting to fetch products from Supermarket 23...")
    try:
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            products_data = response.json()
            total = products_data.get("total")
            products = products_data.get("products")
            
            return products
            print("------Products sm23 process completed successfully------")
        else:
            print(f"Failed to fetch providers. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")
    
    pass