import requests
from apps.product.models import CategoryShop, Shop
from common.utils.categories_functions import get_category_data


def fetch_zones(headers, proxy=None):
    print("Starting to fetch zones...")
    
    
    url = "https://api.katapulk.com/api/v1/zones/zones_with_countries"  
    
    try:
        if proxy:
            response = requests.get(url, headers=headers, proxies={
            "http": proxy,
            "https": proxy
            })
        else:
            response = requests.get(url, headers=headers)
            
        if response.status_code == 200:
            zones_data = response.json()
            zones_ids = []
            for zone in zones_data.get('zones'):
                if zone.get('countries_iso')[0] == 'CU':
                    zones_ids.append(zone.get('id'))
            return zones_ids                   
        else:
            print(f"Failed to fetch zones. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")
        
    return None