from decouple import config
from .categories import update_categories

proxy_url = config("PROXY_URL")   

def update_database_kata():
    update_categories(proxy_url)      







