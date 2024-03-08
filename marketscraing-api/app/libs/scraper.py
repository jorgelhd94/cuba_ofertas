from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.common.by import By

def get_product_name(product_html: WebElement):
    name = product_html.find_element(By.CLASS_NAME, "product_name").find_element(By.TAG_NAME, "a").text
    return name