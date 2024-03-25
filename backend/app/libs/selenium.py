from selenium.webdriver.chrome.options import Options
from selenium import webdriver

class SeleniumDriver:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(SeleniumDriver, cls).__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self):
        if not hasattr(self, 'driver'):
            # Configuración de Chrome en modo headless
            chrome_options = Options()
            # chrome_options.add_argument("--headless")
            chrome_options.add_argument("--no-sandbox")
            chrome_options.add_argument("--disable-dev-shm-usage")

            # Inicializa el controlador de Chrome
            self.driver = webdriver.Chrome(options=chrome_options)
    
    @classmethod
    def get_driver(cls, endpoint: str):
        # Navega a una página web
        cls._instance.driver.get("https://www.supermarket23.com/es/" + endpoint)
        return cls._instance.driver
    
    @classmethod
    def quit(cls):
        cls._instance.driver.quit()