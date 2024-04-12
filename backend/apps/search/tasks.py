from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.remote.webelement import WebElement

from common.libs.selenium import SeleniumDriver
from common.libs import scraper

from apps.product.models import Product, Manufacture

import datetime

def update_database_sm23():   
    seleniumDriver = SeleniumDriver()
    base_url = "productos"

    try:
        total, first_20 = create_first_20(seleniumDriver, base_url)

        if not total: return {"total": 0, "products": []}

        create_or_update_products(seleniumDriver, base_url, first_20)

    except Exception as e:
        print("Ocurrió un error:", e)
    finally:
        seleniumDriver.quit()

    return {"total": 0, "products": []}


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
    product_id_list = []
    current_page = 1
    orderBy = 0
    exists_product = False

    now = datetime.datetime.now()

    while not exists_product:
        driver = seleniumDriver.get_driver(f"{base_url}?pagina={str(current_page)}&orden={str(orderBy)}")

        WebDriverWait(driver, 120).until(
            EC.presence_of_element_located((By.TAG_NAME, "app-product-block-v"))
        )
    
        products_html = driver.find_elements(By.TAG_NAME, "app-product-block-v")

        count = 0

        for product_html in products_html:
            product_id, product_data = scraper.get_product_data(product_html)

            if product_id in first_20:
                count += 1
                exists_product = count == 20
                continue

            if product_id in product_id_list:
                exists_product = True
                break

            product_id_list.append(product_id)

            create_product_and_manufacture(product_id, product_data)
            
        
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
    product, created = Product.objects.update_or_create(product_id=product_id, manufacture=manufacture, defaults=product_data)