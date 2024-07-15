import time
from common.libs.selenium import SeleniumDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


base_url = "https://www.almendarestravel.com/products/backend"
login_url = "/login"

test_credentials = {
    "username": "victor.leon",
    "password": "victor*2023"
}


def test_tkc():
    seleniumDriver = SeleniumDriver(url=base_url)

    try:
        driver = seleniumDriver.get_driver(login_url)
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.NAME, "username")))
        time.sleep(2)

        # Encuentra los campos de entrada y el botón de inicio de sesión
        email_field = driver.find_element(By.NAME, "username")
        password_field = driver.find_element(By.NAME, "password")
        login_button = driver.find_element(
            By.XPATH, "//button[@type='submit']")

        email_field.send_keys(test_credentials["username"])
        password_field.send_keys(test_credentials["password"])

        login_button.click()

        time.sleep(4)
    except Exception as e:
        print("Ocur   un error:", e)
    finally:
        seleniumDriver.quit()
