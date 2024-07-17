from common.libs.selenium import SeleniumDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

import requests
from bs4 import BeautifulSoup

from common.utils.datetime_functions import get_previous_formatted_date


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

    # warehouses_dict = get_tkc_warehouses(session)
    # inventory_data = get_tkc_inventory_report(session, '203')
    # products_data = get_tkc_products(session)
    # combos_data = get_tkc_combos(session)
    sells_data = get_tkc_sells_report(session, 'all')

    return sells_data.json()


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


def get_tkc_products(session: requests.Session):
    inventory_products_endpoint = "/provider/invetario/productos"

    inventory_payload = {
        'length': '-1',
        'almacenes': ["all"],
        'existencia': 'existencia',
        'tienda': 'tienda',
        'inventario': 'tienda'
    }

    response = session.post(
        base_url + inventory_products_endpoint, data=inventory_payload)

    if response.status_code == 200:
        return response
    else:
        raise Exception("Ocurrio un error al realizar la petición")


def get_tkc_combos(session: requests.Session):
    combos_products_endpoint = "/admin/shop-provider-combos/combo/tienda/ajax/list/"

    response = session.post(
        base_url + combos_products_endpoint)

    if response.status_code == 200:
        return response
    else:
        raise Exception("Ocurrio un error al realizar la petición")


def get_tkc_inventory_report(session: requests.Session, warehouse_id: str):
    inventory_report_endpoint = "/reportes/cierres"

    inventory_payload = {
        'fecha': get_previous_formatted_date(previous_days=1, format="%Y-%m-%d"),
        'almacen': warehouse_id,
        'existencia': 'True',
        'tienda': 'True',
        'aviable': 'False',
        'active': 'False',
        'bloqueados': 'False',
        'tipos[]': 'all'
    }

    response = session.post(
        base_url + inventory_report_endpoint, data=inventory_payload)

    if response.status_code == 200:
        return response
    else:
        raise Exception("Ocurrio un error al realizar la petición")


def get_tkc_sells_report(session: requests.Session, warehouse_id: str):
    inventory_report_endpoint = "/reportes/load/historial/tkc/productos"

    inventory_payload = {
        'fechaInicio': get_previous_formatted_date(previous_days=1, format="%Y-%m-%d"),
        'fechaFin': get_previous_formatted_date(previous_days=1, format="%Y-%m-%d"),
        'almacenes[]': warehouse_id,
        'criterios': 'ordenes',
    }

    response = session.post(
        base_url + inventory_report_endpoint, data=inventory_payload)

    if response.status_code == 200:
        return response
    else:
        raise Exception("Ocurrio un error al realizar la petición")
