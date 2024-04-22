from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from common.libs.selenium import SeleniumDriver
from common.libs import scraper

from apps.product.models import Product, Manufacture, Category, Provider


def update_database_sm23():   
    seleniumDriver = SeleniumDriver()
    base_url = "productos"

    try:
        # now = timezone.now()
        # total, first_20 = create_first_20(seleniumDriver, base_url)

        # if not total: return {"total": 0, "products": []}

        # create_or_update_products(seleniumDriver, base_url, first_20)

        # filter_products = Product.objects.filter(updated_at__lt=now)
        # filter_products.delete()

        update_product_meta(seleniumDriver)

    except Exception as e:
        print("Ocurrió un error:", e)
    finally:
        seleniumDriver.quit()

    return {"total": 0, "deleted_products": []}


def create_first_20(seleniumDriver: SeleniumDriver, base_url: str):
    first_20 = []
    driver = seleniumDriver.get_driver(base_url)
    WebDriverWait(driver, 120).until(
        EC.presence_of_element_located((By.TAG_NAME, "app-product-block-v"))
    )

    total = scraper.get_total(driver)

    products_html = driver.find_elements(By.TAG_NAME, "app-product-block-v")
    
    for product_html in products_html:
        product_id, product_data = scraper.get_product_data(product_html)
        
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

        WebDriverWait(driver, 120).until(
            EC.presence_of_element_located((By.TAG_NAME, "app-product-block-v"))
        )
    
        products_html = driver.find_elements(By.TAG_NAME, "app-product-block-v")

        count = 0

        for product_html in products_html:
            product_id, product_data = scraper.get_product_data(product_html)

            if product_id in first_20:
                # Si el producto se encuentra en los primeros 20
                # se aumenta el contador y se verifica si SM23 regreso
                # a la primera pagina debido al error de paginacion
                count += 1
                exists_product = count == 20
                continue

            if product_id in product_id_list:
                # En caso de que el producto no este en los primeros 20,
                # pero si en la lista de productos creados o actualizados,
                # entonces se termina el loop debido que se encontraron todos
                # los productos
                exists_product = True
                break

            product_id_list.append(product_id)

            create_product_and_manufacture(product_id, product_data)
            
        # En caso de que este en la primera pagina
        # pero el orden actual sea de menor a mayor
        # se cambia el orden de mayor a menor
        # En caso contrario se finaliza el bucle
        if exists_product and orderBy == 0:
            current_page = 1
            orderBy = 1
            exists_product = False
            continue
        
        # TODO: Cambiar a 1 al terminar
        current_page += 500


def create_product_and_manufacture(product_id: str, product_data: dict):
    manufacture_data = product_data.pop("manufacture", None)
    manufacture, created = Manufacture.objects.update_or_create(**manufacture_data)
    Product.objects.update_or_create(product_id=product_id, manufacture=manufacture, defaults=product_data)


def update_product_meta(seleniumDriver: SeleniumDriver):
    products = Product.objects.all()

    for product in products:
        product_meta = scraper.get_product_meta(seleniumDriver, product.product_id)
        category, provider = create_update_product_meta(product_meta)

        product.category = category
        product.provider = provider

        product.save()
        break


def create_update_product_meta(product_meta: dict):
    category, created = Category.objects.update_or_create(**product_meta["category"])
    provider, created = Provider.objects.update_or_create(**product_meta["provider"])

    return category, provider

