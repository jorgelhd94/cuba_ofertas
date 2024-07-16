import time
from common.libs.selenium import SeleniumDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import requests
from bs4 import BeautifulSoup


test_credentials = {
    "username": "victor.leon",
    "password": "victor*2023"
}

base_url = "https://www.almendarestravel.com/products/backend"


def test_tkc():
    seleniumDriver = SeleniumDriver(url=base_url)

    driver_auth = tkc_login(seleniumDriver)

    selenium_cookies = driver_auth.get_cookies()

    seleniumDriver.quit()

    cookies = {cookie['name']: cookie['value'] for cookie in selenium_cookies}

    session = requests.Session()
    session.cookies.update(cookies)

    warehouses_dict = get_tkc_warehouses(session)

    return warehouses_dict


def tkc_login(seleniumDriver: SeleniumDriver):
    login_endpoint = "/login"

    driver = seleniumDriver.get_driver(login_endpoint)
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.ID, "username")))

    # Encuentra los campos de entrada y el botón de inicio de sesión
    email_field = driver.find_element(By.ID, "username")
    password_field = driver.find_element(By.ID, "password")

    login_button = driver.find_element(
        By.ID, "kt_login_signin_submit")

    email_field.send_keys(test_credentials["username"])
    password_field.send_keys(test_credentials["password"])

    login_button.click()

    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located((By.CLASS_NAME, "kt-page-loader")))

    return driver


def get_tkc_warehouses(session: requests.Session):
    get_warehouse_endpoint = "/reportes/listado/inventario"

    response = session.get(base_url + get_warehouse_endpoint)

    if response.status_code == 200:
        data = response.text
        soup = BeautifulSoup(data, 'html.parser')
        select = soup.find('select', {'name': 'almacenes'})

        if select:
            warehouses = []
            options = select.find_all('option')

            for option in options:
                value = option['value']
                text = option.get_text(strip=True)
                if value:  # Ignorar opciones sin valor
                    warehouses.append(
                        {
                            "id": value,
                            "name": text
                        }
                    )

            return warehouses
        else:
            raise Exception(
                "No se encontró el elemento <select> con el nombre 'almacenes'")
    else:
        raise Exception("Ocurrió un error al realizar la petición")


def get_tkc_inventory_report(session: requests.Session):
    inventory_report_endpoint = "/reportes/cierres"

    inventory_payload = {
        'fecha': '2024-07-15',
        'almacen': '203',
        'existencia': 'true',
        'tienda': 'true',
        'aviable': 'false',
        'active': 'false',
        'bloqueados': 'false',
        'tipos[]': 'all'
    }

    response = session.post(
        base_url + inventory_report_endpoint, data=inventory_payload)

    if response.status_code == 200:
        data = response.json()
        return data
    else:
        raise Exception("Ocurrio un error al realizar la petición")
