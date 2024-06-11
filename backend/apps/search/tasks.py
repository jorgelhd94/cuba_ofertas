from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from common.libs.selenium import SeleniumDriver
from common.libs import scraper_sm23

from apps.product.models import Product, Manufacture, Category, Provider
from apps.statistics_spy.models import ProductsUpdateLogs

from django.utils import timezone


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
    
    # try:
    new_products_count = 0
    updated_products_count = 0

    total, first_20 = create_first_20(seleniumDriver, base_url)

    if not total: return {"total": 0, "products": []}

    create_or_update_products(seleniumDriver, base_url, first_20)
    update_product_meta(seleniumDriver)

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

    # except Exception as e:
    #     print("Ocurrió un error:", e)
    #     update.end_time = timezone.now()
    #     update.status = 'error'
    #     update.note = str(e)
    # finally:
    print("Terminado")
    seleniumDriver.quit()
    update.save()

    return {"total": 0, "deleted_products": []}


def create_first_20(seleniumDriver: SeleniumDriver, base_url: str):
    first_20 = []

    driver = seleniumDriver.get_driver(base_url)
    WebDriverWait(driver, 120).until(
        EC.presence_of_element_located((By.TAG_NAME, "app-product-block-v"))
    )

    total = scraper_sm23.get_total(driver)

    products_html = driver.find_elements(By.TAG_NAME, "app-product-block-v")
    
    for product_html in products_html:
        product_id, product_data = scraper_sm23.get_product_data(product_html)
        
        first_20.append(product_id)

        create_product_and_manufacture(product_id, product_data)

    return total, first_20


def create_or_update_products(seleniumDriver: SeleniumDriver, base_url: str, first_20: list):
    """
    Funcion para crear o actualizar los productos haciendo Scrappin en Supermarket23.
    Debido al error que tiene el buscador general de Supermarket con las paginaciones
    mayores a 500, se decidio usar el siguiente algoritmo:

    1. Guardar los primeros 20 productos de la busqueda general sin filtros (esto es sin ordenar y usando la primera pagina)
    2. Luego se ordena la busqueda de menor a mayor precio y se crean o actualizan los productos
    3. En caso de que la paginacion de supermarket de error(esto se sabe porque regresa automaticamente a la primera pagina)
        entonces se ordena de mayor a menor y se procede a seguir actualizando
    4. Se termina una vez se traigan todos los productos
    """

    product_id_list = []
    current_page = 1
    orderBy = 0
    exists_product = False


    while not exists_product:
        # Se va a la primera pagina ordenado de menor a mayor
        driver = seleniumDriver.get_driver(f"{base_url}?pagina={str(current_page)}&orden={str(orderBy)}")

        print("URL: " f"{base_url}?pagina={str(current_page)}&orden={str(orderBy)}")

        WebDriverWait(driver, 120).until(
            EC.presence_of_element_located((By.TAG_NAME, "app-product-block-v"))
        )
    
        products_html = driver.find_elements(By.TAG_NAME, "app-product-block-v")

        count = 0


        for product_html in products_html:
            product_id, product_data = scraper_sm23.get_product_data(product_html)

            if product_id in first_20:
                # Si el producto se encuentra en los primeros 20
                # se aumenta el contador y se verifica si SM23 regreso
                # a la primera pagina debido al error de paginacion
                count += 1
                exists_product = count == 20
                continue
            elif product_id in product_id_list:
                print("Se encontro un producto repetido: " + product_id)
                # En caso de que el producto no este en los primeros 20,
                # pero si en la lista de productos creados o actualizados,
                # entonces se termina el loop debido que se encontraron todos
                # los productos
                exists_product = True
                break

            product_id_list.append(product_id)

            print("Procesando producto: " + product_id)

            create_product_and_manufacture(product_id, product_data)
            
        # En caso de que esté en la primera pagina
        # pero el orden actual sea de menor a mayor
        # se cambia el orden de mayor a menor
        # En caso contrario se finaliza el bucle
        if exists_product and orderBy == 0:
            print("Cambio de orden: De mayor a menor precio")
            current_page = 1
            orderBy = 1
            exists_product = False
            continue
        
        # TODO: Cambiar a 1 al terminar
        print("Pagina procesada: " + str(current_page))
        current_page += 1

def create_product_and_manufacture(product_id: str, product_data: dict):
    manufacture_data = product_data.pop("manufacture", None)
    manufacture, created = Manufacture.objects.update_or_create(**manufacture_data)
    Product.objects.update_or_create(product_id=product_id, manufacture=manufacture, defaults=product_data)


def update_product_meta(seleniumDriver: SeleniumDriver):
    products = Product.objects.all()

    for product in products:
        product_meta = scraper_sm23.get_product_meta(seleniumDriver, product.product_id)
        category, provider = create_update_product_meta(product_meta)

        product.category = category
        product.provider = provider

        product.save()


def create_update_product_meta(product_meta: dict):
    category = product_meta["category"]
    provider = product_meta["provider"]

    if(category):
        category, created = Category.objects.update_or_create(**product_meta["category"])
    
    if(provider):
        provider, created = Provider.objects.update_or_create(**product_meta["provider"])

    return category, provider


