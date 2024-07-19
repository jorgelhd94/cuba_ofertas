from decouple import config
from .categories import update_categories
from .zones import fetch_zones
from .products import update_products
from apps.product.models import Shop


proxy_url = config("PROXY_URL")   
origin = config("ORIGIN")

headers = {
    "Origin": origin,
}

def update_database_kata():
    katapulk = {
        "name": "Katapulk",
        "url": "https://www.katapulk.com/",
        "slug": "kata"
    }
    
    shop, created = Shop.objects.get_or_create(defaults=katapulk, slug='kata')
    
    # update_categories(shop, proxy_url)      
    # return fetch_zones(headers)   
    
    return update_products(headers, shop)   






