from decouple import config
from .categories import update_categories
from .zones import fetch_zones
from .products import update_products


proxy_url = config("PROXY_URL")   
origin = config("ORIGIN")

headers = {
    "Origin": origin,
}

def update_database_kata():
    # update_categories(proxy_url)      
    # return fetch_zones(headers)   
    return update_products(headers, proxy_url)   






