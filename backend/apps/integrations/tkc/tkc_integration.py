from apps.integrations.tkc.classes.tkc_classes import ComboTKC, ProductSubmayorTKC, ProductTKC, SellTKC
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

    try:
        driver_auth = tkc_login(seleniumDriver)
    except Exception as e:
        seleniumDriver.quit()
        raise Exception("Ocurrio un error al conectarse", e)

    if not driver_auth:
        seleniumDriver.quit()
        raise Exception("Ocurrio un error al iniciar sesión")

    selenium_cookies = driver_auth.get_cookies()

    seleniumDriver.quit()

    cookies = {cookie['name']: cookie['value'] for cookie in selenium_cookies}

    session = requests.Session()
    session.cookies.update(cookies)

    warehouses_dict = get_tkc_warehouses(session)

    all_products = []

    for warehouse in warehouses_dict:
        warehouse_id = warehouse['id']
        products_data = get_tkc_products_submayor(session, warehouse_id)
        products = [ProductSubmayorTKC(**product)
                    for product in products_data.json()['data']]
        all_products.extend(products)

    combos_data = get_tkc_combos(session)
    combos = [
        ComboTKC(**combo) for combo in combos_data.json()
    ]

    sells_data = get_tkc_sells_report(session, 'all', 1)

    sells = [
        SellTKC(**sell) for sell in sells_data.json()['data']
    ]

    return {
        'products': len(all_products),
        'combos': len(combos),
        'sells': len(sells),
    }


def tkc_login(seleniumDriver: SeleniumDriver):
    print("Login started")
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

    try:
        WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.CLASS_NAME, "alert-warning")))

        return None
    except Exception as e:
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CLASS_NAME, "kt-page-loader")))

    print("Login ended successfully")

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
    print("Fetching products...")
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
        print("Products fetched successfully")
        return response
    else:
        raise Exception("Ocurrio un error al realizar la petición")


def get_tkc_combos(session: requests.Session):
    print("Fetching combos...")
    combos_products_endpoint = "/admin/shop-provider-combos/combo/tienda/ajax/list/"

    response = session.post(
        base_url + combos_products_endpoint)

    if response.status_code == 200:
        print("Combos fetched successfully")
        return response
    else:
        raise Exception("Ocurrio un error al realizar la petición")


def get_tkc_products_submayor(session: requests.Session, warehouse_id: str):
    print("Fetching products submayor...")
    print("Almacen:", warehouse_id, "...")

    inventory_report_endpoint = "/reportes/load/products/update"

    inventory_payload = {
        'almacen': warehouse_id,
        'existencia': 'true',
    }

    response = session.post(
        base_url + inventory_report_endpoint, data=inventory_payload)

    if response.status_code == 200:
        print("Products submayor fetched successfully")
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


def get_tkc_sells_report(session: requests.Session, warehouse_id: str, previous_days: int):
    print("Fetching sells...")
    inventory_report_endpoint = "/reportes/load/historial/tkc/productos"

    inventory_payload = {
        'fechaInicio': get_previous_formatted_date(previous_days=previous_days, format="%Y-%m-%d"),
        'fechaFin': get_previous_formatted_date(previous_days=previous_days, format="%Y-%m-%d"),
        'almacenes[]': warehouse_id,
        'criterios': 'ordenes',
    }

    response = session.post(
        base_url + inventory_report_endpoint, data=inventory_payload)

    if response.status_code == 200:
        print("Sells fetched successfully")
        return response
    else:
        raise Exception("Ocurrio un error al realizar la petición")
