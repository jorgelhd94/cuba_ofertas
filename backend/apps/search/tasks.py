from common.libs.selenium import SeleniumDriver

from apps.product.models import Product
from apps.statistics_spy.models import ProductsUpdateLogs

from django.utils import timezone

from common.libs import scraper_sm23


def update_database_sm23():
    print("Iniciando...")
    seleniumDriver = SeleniumDriver()
    base_url = "productos"

    now = timezone.now()
    
    update = ProductsUpdateLogs(
        start_time=now,
        status='processing'
    )
    update.save()
    
    try:
        new_products_count = 0
        updated_products_count = 0

        total, first_20 = scraper_sm23.create_first_20(seleniumDriver, base_url)

        if not total: return {"total": 0, "products": []}

        scraper_sm23.create_or_update_products(seleniumDriver, base_url, first_20)
        scraper_sm23.update_product_meta(seleniumDriver)

        new_products = Product.objects.filter(created_at__gte=now)
        new_products_count = new_products.count()

        updated_products = Product.objects.filter(updated_at__gte=now).exclude(created_at=now)
        updated_products_count = updated_products.count()

        deleted_products = Product.objects.filter(updated_at__lt=now)
        deleted_products_count = deleted_products.count()
        deleted_products.delete()

        update.end_time = timezone.now()
        update.status = 'success'
        update.new_products_count = new_products_count
        update.updated_products_count = updated_products_count
        update.deleted_products_count = deleted_products_count

    except Exception as e:
        print("Ocurrió un error:", e)
        update.end_time = timezone.now()
        update.status = 'error'
        update.note = str(e)
    finally:
        print("Terminado")
        seleniumDriver.quit()
        update.save()

    return {"total": 0, "deleted_products": []}


# def update_product_meta_sm23():
#     print("Iniciando...")
#     seleniumDriver = SeleniumDriver()

#     try:
#         scraper_sm23.update_product_meta(seleniumDriver)
#     except Exception as e:
#         print("Ocurrió un error:", e)
#     finally:
#         seleniumDriver.quit()




