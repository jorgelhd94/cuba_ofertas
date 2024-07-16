import requests

def update_database_kata():
    print("Starting to fetch...")
    
    url = "https://api-services.katapulk.com/api/proxy/spree/api/v1/products"  
    try:
        response = requests.get(url, proxies={
        "http": "http://fpfiszuw-rotate:96zfo0p2yajy@p.webshare.io:80/",
        "https": "http://fpfiszuw-rotate:96zfo0p2yajy@p.webshare.io:80/"
        })
        if response.status_code == 200:
            products_data = response.json()
            products = products_data.get('products', [])
            
            for product_data in products:
                product_id = product_data.get('id')
                product_name = product_data.get('name')
                
                print(f"Product ID: {product_id}, Name: {product_name}")
        else:
            print(f"Failed to fetch products. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")
        
update_database_kata()






