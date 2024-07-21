from decouple import config
from .categories import update_categories
from .products import update_products
from .providers import update_providers
from apps.product.models import Shop


proxy_url = config("PROXY_URL")   
origin = config("ORIGIN_KATAPULK")

headers = {
    "Origin": origin,
}

def update_database_kata():
    katapulk = {
        "name": "Katapulk",
        "url": "https://www.katapulk.com/",
        "slug": "kata"
    }
    shop, created = Shop.objects.get_or_create(slug='kata', defaults=katapulk)
    
    update_categories(headers, shop)      
    update_providers(headers, shop)   
    update_products(headers, shop)   
    






