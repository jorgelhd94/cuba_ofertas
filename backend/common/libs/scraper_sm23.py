from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.by import By
from common.libs.selenium import SeleniumDriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re


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
    driver = seleniumDriver.get_driver(f"producto/{product_id}")
    WebDriverWait(driver, 120).until(
        EC.presence_of_element_located((By.CLASS_NAME, "product_meta"))
        )

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