from decouple import config
from .products import update_products
from apps.product.models import Shop, Product
from django.utils import timezone
from apps.statistics_spy.models import ProductsUpdateLogs

proxy_url = config("PROXY_URL")
origin = config("ORIGIN_SM23")


def update_database_sm23_api():
    headers = {
        "Origin": origin,
    }

    start_update = timezone.now()

    update = ProductsUpdateLogs(
        start_time=start_update,
        status='processing',
        name='Supermarket23: Processing products'
    )
    update.save()

    try:
        new_products_count = 0
        updated_products_count = 0

        sm23 = {
            "name": "Supermarket 23",
            "url": "https://www.supermarket23.com/es/",
            "slug": "sm23"
        }
        shop, created = Shop.objects.get_or_create(
            slug='sm23', defaults=sm23)

        update_products(headers, shop)

        new_products = Product.objects.filter(created_at__gte=start_update, shop=shop)
        new_products_count = new_products.count()

        updated_products = Product.objects.filter(
            updated_at__gte=start_update, shop=shop).exclude(created_at__gte=start_update)
        updated_products_count = updated_products.count()

        deleted_products = Product.objects.filter(updated_at__lt=start_update, shop=shop)
        deleted_products_count = deleted_products.count()

        update.end_time = timezone.now()
        update.status = 'success'
        update.new_products_count = new_products_count
        update.updated_products_count = updated_products_count
        update.deleted_products_count = deleted_products_count

        shop.date_last_update = start_update
        shop.save()
    except Exception as e:
        print("Ocurrió un error:", e)
        update.end_time = timezone.now()
        update.status = 'error'
        update.note = str(e)
    finally:
        update.save()
        
    return {"proceso": "Terminado"}
