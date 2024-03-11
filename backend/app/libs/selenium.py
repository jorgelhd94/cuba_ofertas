from selenium.webdriver.chrome.options import Options
from selenium import webdriver

class SeleniumDriver:
    def __init__(self):
        # Configuración de Chrome en modo headless
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")

        # Inicializa el controlador de Chrome
        self.driver = webdriver.Chrome(options=chrome_options)
    
    def get_driver(self, endpoint: str):
        # Navega a una página web
        self.driver.get("https://www.supermarket23.com/es/" + endpoint)
        return self.driver