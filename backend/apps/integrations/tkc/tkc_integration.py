from apps.integrations.models import TKC_Credentials
from apps.integrations.tkc.serializers import ComboTKCSerializer, ProductSubmayorTKCSerializer, SellTKCSerializer
from apps.integrations.tkc.tkc_api import authenticate_and_get_session, get_tkc_warehouses
from apps.integrations.tkc.tkc_functions import create_or_update_combos, create_or_update_products, create_or_update_sells
from common.libs.selenium import SeleniumDriver


def tkc_initial_configuration(base_url, credentials: TKC_Credentials):
    seleniumDriver = SeleniumDriver(url=base_url)
    session = authenticate_and_get_session(seleniumDriver, {
        "username": credentials.username,
        "password": credentials.password
    })

    # Get and create Warehouses
    warehouses_dict = get_tkc_warehouses(session)

    # Get and create Products
    all_products = create_or_update_products(
        session, warehouses_dict, credentials)

    # Get and create Combos
    combos = create_or_update_combos(session, credentials)

    # Get and create Sells for the last 7 days
    all_sells = create_or_update_sells(session)

    products_serialized = ProductSubmayorTKCSerializer(
        all_products, many=True).data
    combos_serialized = ComboTKCSerializer(combos, many=True).data
    sells_serialized = SellTKCSerializer(all_sells, many=True).data

    return {
        'products': products_serialized,
        'combos': combos_serialized,
        'sells': sells_serialized,
    }
