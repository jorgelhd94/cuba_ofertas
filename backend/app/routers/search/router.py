from fastapi import APIRouter, Depends, HTTPException
from app.libs.selenium import SeleniumDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from app.libs.scraper import get_product_data

search_router = APIRouter(
    prefix="/search",
    tags=["search"],
    responses={404: {"description": "Not found"}},
)

@search_router.get("/")
def search_products(search_text: str = ""):
    # Navega a una página web
    seleniumDriver = SeleniumDriver()

    count_products = 0
    products = []

    try:
        driver = seleniumDriver.get_driver("buscar?q=" + search_text  if search_text else "productos/")
        WebDriverWait(driver, 120).until(
            EC.presence_of_element_located((By.TAG_NAME, "app-product-block-v"))
        )

        products_html = driver.find_elements(By.TAG_NAME, "app-product-block-v")
        
        count_products = len(products_html)

        for product in products_html:
            products.append(get_product_data(product))
    except Exception as e:
        print("Ocurrió un error:", e)
        raise HTTPException(status_code=500, detail="Ocurrio un error")
    finally:
        seleniumDriver.driver.quit()
    
    return {"total": count_products, "products": products}