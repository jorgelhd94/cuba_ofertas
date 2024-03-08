from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.by import By

def get_product_data(product_html: WebElement):
    # name = product_html.get_attribute("outerHTML")
    product_url = product_html.find_element(By.CLASS_NAME, "primary_img").get_attribute("href")
    image_url = product_html.find_element(By.CLASS_NAME, "primary_img").find_element(By.TAG_NAME, "img").get_attribute("src")
    name = product_html.find_element(By.CLASS_NAME, "product_name").find_element(By.TAG_NAME, "a").get_attribute("innerHTML")

    manufacture_tag = product_html.find_element(By.CLASS_NAME, "manufacture_product").find_element(By.TAG_NAME, "a")
    manufacture_product = {
        "name": manufacture_tag.get_attribute("innerHTML"),
        "url": manufacture_tag.get_attribute("href")
    }
    
    try:
        price = product_html.find_element(By.CLASS_NAME, "regular_price").get_attribute("innerHTML")
    except:
        price = product_html.find_element(By.CLASS_NAME, "current_price").get_attribute("innerHTML")
        

    return {
        "product_url": product_url,
        "image_url": image_url,
        "name": name,
        "manufacture": manufacture_product,
        "current_price":price
    }