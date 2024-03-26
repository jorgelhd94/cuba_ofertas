from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from common.libs.selenium import SeleniumDriver
from common.libs import scraper

class SearchView(APIView):
    def get(self, request):
        total = 0
        page_amount_text = ""
        products = []

        query_params = request.query_params
        search_text = query_params.get('search_text', None)
        pagination = query_params.get('pagination', -1)
        orderby = query_params.get('orderby', -1)
        
        # Navega a una página web
        seleniumDriver = SeleniumDriver()

        base_url = "buscar?q=" + search_text if search_text else "productos?"
            
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
            raise Response({"detail":e}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        finally:
            seleniumDriver.quit()
        
        return Response({"total": total, "page_amount_text": page_amount_text, "products": products})