from selenium.webdriver.chrome.options import Options
from selenium import webdriver

class SeleniumDriver:
    base_url = "https://www.supermarket23.com/es/"
    
    def __init__(self):    
        # Configuración de Chrome en modo headless
        chrome_options = Options()
        # TODO: Decomentar debajo cuando pase a produccion
        # chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument('--disable-blink-features=AutomationControlled')

        # Inicializa el controlador de Chrome
        self.driver = webdriver.Chrome(options=chrome_options)
    
    def get_driver(self, endpoint: str):
        try:
            self.driver.get(self.base_url + endpoint)
        except Exception as e:
            print(f"Error: {e}")
            self.restart_driver()
            self.driver.get(self.base_url + endpoint)
        
        return self.driver
    
    def quit(self):
        self.driver.quit()
    
    def restart_driver(self):
        # Cerrar el controlador actual y reiniciarlo
        try:
            quit()
        except Exception as e:
            print(f"Error al cerrar el driver: {e}")

        self.driver = self._init_driver()
        