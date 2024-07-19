import requests
from apps.product.models import Provider


def update_providers(headers, shop, proxy=None):
    print("Starting to fetch providers...")
    
    
    url = "https://api-services.katapulk.com/api/proxy/spree/api/v1/multi_stores"  
    
    try:
        response = requests.get(url, headers=headers)
            
        if response.status_code == 200:
            providers_data = response.json()
            
            for provider in providers_data:
                new_provider = {
                    "name": provider["name"],
                    "url": provider["url"],
                    "shop": shop,
                    "provider_id": provider["id"]
                }
                
                Provider.objects.update_or_create(
                    provider_id=provider["id"],
                    shop=shop,
                    defaults=new_provider
                )
            print("------Provider process completed successfully------")
        else:
            print(f"Failed to fetch providers. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")
        