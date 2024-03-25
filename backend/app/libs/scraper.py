from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.by import By

def check_if_search_not_found(page_html: WebElement):
    try:
        page_html.find_element(By.CLASS_NAME, "no-products")
        return True
    except:
        return False


def get_product_data(product_html: WebElement):
    product_url = product_html.find_element(By.CLASS_NAME, "primary_img").get_attribute("href")
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
        price_by_weight = product_html.find_element(By.CLASS_NAME, "price-by-weight").get_attribute("innerHTML")
    except:
        price_by_weight = ""

    if price_by_weight:
        price_by_weight = price_by_weight.replace("\n", "").split("&nbsp;")
        price_by_weight = {
                "price": float(price_by_weight[0].replace(" ", "").replace(".", "").replace(",", ".")),
                "currency": price_by_weight[1]
            }
    else:
        price_by_weight = None

    return {
        "id": product_url.split("/")[-1],
        "name": name,
        "product_url": product_url,
        "image_url": image_url,
        "manufacture": manufacture_product,
        "current_price":float(price[0].replace(" ", "").replace(".", "").replace(",", ".")),
        "currency": price[1],
        "price_by_weight": price_by_weight
    }


def get_page_amount_text(page_html: WebElement):
    page_amount = page_html.find_element(By.CLASS_NAME, "page_amount").find_element(By.TAG_NAME, "p").get_attribute("innerHTML")
    return page_amount.replace("<!---->", "").replace("\"", "")

def get_page_amount(page_html: WebElement):
    page_amount = page_html.find_element(By.CLASS_NAME, "page_amount").find_element(By.TAG_NAME, "p").get_attribute("innerHTML")
    return int(page_amount.replace("<!---->", "").replace("\"", "").split(" ")[-2])