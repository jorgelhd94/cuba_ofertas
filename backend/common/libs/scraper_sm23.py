from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.by import By
from common.libs.selenium import SeleniumDriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
from apps.product.models import Product, Manufacture, Category, Provider


def check_if_search_not_found(page_html: WebElement):
    try:
        page_html.find_element(By.CLASS_NAME, "no-products")
        return True
    except:
        return False


def get_product_data(product_html: WebElement):
    product_url = product_html.find_element(By.CLASS_NAME, "primary_img").get_attribute("href")
    product_id =  product_url.split("/")[-1]
    image_url = product_html.find_element(By.CLASS_NAME, "primary_img").find_element(By.TAG_NAME, "img").get_attribute("src")
    name = product_html.find_element(By.CLASS_NAME, "product_name").find_element(By.TAG_NAME, "a").get_attribute("innerHTML")

    manufacture_tag = product_html.find_element(By.CLASS_NAME, "manufacture_product").find_element(By.TAG_NAME, "a")
    manufacture_product = {
        "name": manufacture_tag.get_attribute("innerHTML").replace("&nbsp;", ""),
        "url": manufacture_tag.get_attribute("href")
    }
    
    try:
        price = product_html.find_element(By.CLASS_NAME, "regular_price").get_attribute("innerHTML")
    except:
        price = product_html.find_element(By.CLASS_NAME, "current_price").get_attribute("innerHTML")    
    
    price = price.replace("\n", "").split("&nbsp;")

    try:
        price_by_weight_text = product_html.find_element(By.CLASS_NAME, "price-by-weight").get_attribute("innerHTML")
    except:
        price_by_weight_text = ""

    if price_by_weight_text:
        price_by_weight_text = price_by_weight_text.replace("\n", "").split("&nbsp;")
        price_by_weight = float(price_by_weight_text[0].replace(" ", "").replace(".", "").replace(",", "."))
        currency_by_weight = price_by_weight_text[1]
    else:
        price_by_weight = None
        currency_by_weight = None

    return product_id, {
            "name": name,
            "product_url": product_url,
            "image_url": image_url,
            "manufacture": manufacture_product,
            "current_price":float(price[0].replace(" ", "").replace(".", "").replace(",", ".")),
            "currency": price[1],
            "price_by_weight": price_by_weight,
            "currency_by_weight": currency_by_weight
    }


def get_product_meta(seleniumDriver: SeleniumDriver, product_id: str):
    try:
        driver = seleniumDriver.get_driver(f"producto/{product_id}")
        WebDriverWait(driver, 60).until(
            EC.presence_of_element_located((By.CLASS_NAME, "product_meta"))
            )
    except:
        print("Error Actualizando meta de producto: " + product_id)
        return {
            "category": None, "provider": None
        }

    categoria_elemento = driver.find_element(By.XPATH, '//span[@itemtype="https://schema.org/CategoryCode"]')
    categoria_url = categoria_elemento.find_element(By.TAG_NAME, 'a').get_attribute("href")

    categoria = {
        "category_id": categoria_url.split("/")[-1],
        "name": re.search(r'Categoría: (.*)', categoria_elemento.text).group(1),
        "url": categoria_url
    }

    proveedor_elemento = driver.find_element(By.XPATH, '//span[contains(text(), "Proveedor")]')
    proveedor_url = proveedor_elemento.find_element(By.TAG_NAME, 'a').get_attribute("href")

    proveedor = {
        "name": re.search(r'Proveedor: (.*)', proveedor_elemento.text).group(1),
        "url": proveedor_url
    }

    print("Actualizando meta de producto: " + product_id)

    return {
        "category": categoria, "provider": proveedor
    }


def get_page_amount_text(page_html: WebElement):
    page_amount = page_html.find_element(By.CLASS_NAME, "page_amount").find_element(By.TAG_NAME, "p").get_attribute("innerHTML")
    return page_amount.replace("<!---->", "").replace("\"", "")


def get_page_amount(page_html: WebElement):
    page_amount = page_html.find_element(By.CLASS_NAME, "page_amount").find_element(By.TAG_NAME, "p").get_attribute("innerHTML")
    return int(page_amount.replace("<!---->", "").replace("\"", "").split(" ")[-2])


def get_total(driver: WebElement):
    if check_if_search_not_found(driver):
        return 0
    
    return get_page_amount(driver)


"""
A partir de aqui estan las funciones que se usan para
actualizar la base de datos de productos.

La funcion que utiliza estas funciones esta ubicada en:
apps.search.tasks.update_database_sm23
"""

def create_first_20(seleniumDriver: SeleniumDriver, base_url: str):
    first_20 = []

    driver = seleniumDriver.get_driver(base_url)
    WebDriverWait(driver, 120).until(
        EC.presence_of_element_located((By.TAG_NAME, "app-product-block-v"))
    )

    total = get_total(driver)

    products_html = driver.find_elements(By.TAG_NAME, "app-product-block-v")
    
    for product_html in products_html:
        product_id, product_data = get_product_data(product_html)
        
        first_20.append(product_id)

        create_product_and_manufacture(product_id, product_data)

    return total, first_20


def create_or_update_products(seleniumDriver: SeleniumDriver, base_url: str, first_20: list):
    """
    Función para crear o actualizar los productos haciendo Scraping en Supermarket23.
    Debido al error que tiene el buscador general de Supermarket con las paginaciones
    mayores a 500, se decidió usar el siguiente algoritmo:

    1. Guardar los primeros 20 productos de la búsqueda general sin filtros (esto es sin ordenar y usando la primera página)
    2. Luego se ordena la búsqueda de menor a mayor precio y se crean o actualizan los productos
    3. En caso de que la paginación de supermarket de error (esto se sabe porque regresa automáticamente a la primera página)
        entonces se ordena de mayor a menor y se procede a seguir actualizando
    4. Se termina una vez se traigan todos los productos
    """

    product_id_list = []
    current_page = 1
    orderBy = 0
    exists_product = False

    while not exists_product:
        # Se va a la primera página ordenado de menor a mayor
        driver = seleniumDriver.get_driver(f"{base_url}?pagina={str(current_page)}&orden={str(orderBy)}")

        print(f"URL: {base_url}?pagina={str(current_page)}&orden={str(orderBy)}")

        WebDriverWait(driver, 120).until(
            EC.presence_of_element_located((By.TAG_NAME, "app-product-block-v"))
        )

        products_html = driver.find_elements(By.TAG_NAME, "app-product-block-v")
        count = 0
        count_repeated = 0

        for product_html in products_html:
            product_id, product_data = get_product_data(product_html)

            if product_id in first_20:
                # Si el producto se encuentra en los primeros 20
                # se aumenta el contador y se verifica si SM23 regresó
                # a la primera página debido al error de paginación
                print(f"Producto en los primeros 20: {product_id}")
                count += 1

                if count == 20:
                    exists_product = True
                    break

                continue

            if product_id in product_id_list:
                count_repeated += 1
                print(f"Se encontró un producto repetido: {product_id}")
                # En caso de que el producto no esté en los primeros 20,
                # pero sí en la lista de productos creados o actualizados,
                # entonces se termina el loop debido a que se encontraron todos
                # los productos

                if(count_repeated == 10):
                    exists_product = True
                    break

                continue

            product_id_list.append(product_id)

            print(f"Procesando producto: {product_id}")

            create_product_and_manufacture(product_id, product_data)

        # En caso de que esté en la primera página
        # pero el orden actual sea de menor a mayor,
        # se cambia el orden de mayor a menor.
        # En caso contrario, se finaliza el bucle.
        if exists_product and orderBy == 0:
            print("Cambio de orden: De mayor a menor precio")
            current_page = 1
            orderBy = 1
            exists_product = False
            continue

        print(f"Página procesada: {current_page}")
        current_page += 1


def create_product_and_manufacture(product_id: str, product_data: dict):
    manufacture_data = product_data.pop("manufacture", None)
    manufacture, created = Manufacture.objects.update_or_create(**manufacture_data)
    Product.objects.update_or_create(product_id=product_id, manufacture=manufacture, defaults=product_data)


def update_product_meta(seleniumDriver: SeleniumDriver):
    products = Product.objects.all()

    for product in products:
        product_meta = get_product_meta(seleniumDriver, product.product_id)
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
