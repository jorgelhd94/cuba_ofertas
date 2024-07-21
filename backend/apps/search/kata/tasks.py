from decouple import config
from .categories import update_categories
from .products import update_products
from .providers import update_providers
from apps.product.models import Shop, Product
from django.utils import timezone
from apps.statistics_spy.models import ProductsUpdateLogs

proxy_url = config("PROXY_URL")   
origin = config("ORIGIN_KATAPULK")

def update_database_kata():
    headers = {
        "Origin": origin,
    }
    
    now = timezone.now()

    update = ProductsUpdateLogs(
        start_time=now,
        status='processing',
        name='katapulk'
    )
    update.save()
    
    try:
        new_products_count = 0
        updated_products_count = 0
        
        katapulk = {
            "name": "Katapulk",
            "url": "https://www.katapulk.com/",
            "slug": "kata"
        }
        shop, created = Shop.objects.get_or_create(slug='kata', defaults=katapulk)
        
        update_categories(headers, shop)      
        update_providers(headers, shop)   
        update_products(headers, shop)   
        
        new_products = Product.objects.filter(created_at__gte=now)
        new_products_count = new_products.count()

        updated_products = Product.objects.filter(
            updated_at__gte=now).exclude(created_at__gte=now)
        updated_products_count = updated_products.count()

        deleted_products = Product.objects.filter(updated_at__lt=now)
        deleted_products_count = deleted_products.count()
        
        update.end_time = timezone.now()
        update.status = 'success'
        update.new_products_count = new_products_count
        update.updated_products_count = updated_products_count
        update.deleted_products_count = deleted_products_count
        update.save()
    except Exception as e:
        print("Ocurrió un error:", e)
        update.end_time = timezone.now()
        update.status = 'error'
        update.note = str(e)

    return {"proceso": "Terminado"}




