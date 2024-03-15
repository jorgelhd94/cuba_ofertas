from fastapi import APIRouter, Depends, HTTPException
from app.libs.selenium import SeleniumDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from app.libs import scraper

search_router = APIRouter(
    prefix="/search",
    tags=["search"],
    responses={404: {"description": "Not found"}},
)

@search_router.get("/")
def search_products(search_text: str = "", pagination: int = 1, orderby:int = -1):
    total = 0
    page_amount_text = ""
    products = []
    
    # Navega a una página web
    seleniumDriver = SeleniumDriver()

    base_url = "buscar?q=" + search_text if search_text else "productos/"
        
    # Append pagination and orderby as query parameters
    url_with_params = f"{base_url}&pagina={pagination}&orden={orderby}"

    try:
        driver = seleniumDriver.get_driver(url_with_params)
        WebDriverWait(driver, 120).until(
            EC.presence_of_element_located((By.TAG_NAME, "app-product-block-v"))
        )

        if not scraper.check_if_search_not_found(driver):
            products_html = driver.find_elements(By.TAG_NAME, "app-product-block-v")
            
            page_amount_text = scraper.get_page_amount_text(driver)
            total = scraper.get_page_amount(driver)

            for product in products_html:
                products.append(scraper.get_product_data(product))

    except Exception as e:
        print("Ocurrió un error:", e)
        raise HTTPException(status_code=500, detail="Ocurrio un error")
    finally:
        seleniumDriver.driver.quit()
    
    return {"total": total, "page_amount_text": page_amount_text, "products": products}