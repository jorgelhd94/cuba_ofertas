import datetime
from apps.integrations.tkc.tkc_api import get_tkc_combos, get_tkc_products_submayor, get_tkc_sells_report
import apps.integrations.models as tkc_models
from django.utils import timezone


def create_or_update_products(session, warehouses_dict, credentials: tkc_models.TKC_Credentials):
    all_products = []
    for warehouse in warehouses_dict:
        warehouse_id = warehouse['id']
        products_data = get_tkc_products_submayor(session, warehouse_id)
        products = products_data.json()['data']

        for product in products:
            product_info = {
                'categoria_online': product.get('categoria_online', ''),
                'idTienda': product.get('idTienda', ''),
                'codigo': product.get('codigo', ''),
                'nombre': product.get('nombre', ''),
                'suministrador': product.get('suministrador', ''),
                'unidad_medida': product.get('unidad_medida', ''),
                'existencia_fisica': product.get('existencia_fisica', 0),
                'almacen': product.get('almacen', ''),
                'tienda': product.get('tienda', ''),
            }
            product_instance, created = tkc_models.ProductSubmayorTKC.objects.update_or_create(
                user_tkc=credentials,
                **product_info
            )
            all_products.append(product_instance)
    return all_products


def create_or_update_combos(session, credentials: tkc_models.TKC_Credentials):
    combos_data = get_tkc_combos(session)
    combos = combos_data.json()
    all_combos = []

    for combo in combos:
        combo_info = {
            'id_producto_tienda': combo.get('ID_PRODUCTO_TIENDA', ''),
            'codigo_producto': combo.get('CODIGO_PRODUCTO', ''),
            'nombre_producto': combo.get('NOMBRE_PRODUCTO', ''),
            'nombre_almacen': combo.get('NOMBRE_ALMACEN', ''),
            'total_producto': combo.get('TOTAL_PRODUCTO', 0),
            'tienda': combo.get('tienda', ''),
            'peso': combo.get('PESO', 0),
            'pv': combo.get('PV', 0),
        }

        combo_instance, created = tkc_models.ComboTKC.objects.update_or_create(
            user_tkc=credentials,
            **combo_info
        )

        for child in combo.get('HIJO_PRODUCTO', []):
            try:
                product_instance = tkc_models.ProductSubmayorTKC.objects.get(
                    idTienda=child.get('ID_PRODUCTO_TIENDA', '')
                )

                cantidad = child.get('TOTAL_PRODUCTO', 0)

                # Create or update the intermediate model
                tkc_models.ComboProductSubmayor.objects.update_or_create(
                    combo=combo_instance,
                    product_submayor=product_instance,
                    defaults={'cantidad': cantidad}
                )
            except tkc_models.ProductSubmayorTKC.DoesNotExist:
                continue

        all_combos.append(combo_instance)

    return all_combos


def create_or_update_sells(session):
    all_sells = []
    for i in range(7):
        sells_data = get_tkc_sells_report(session, 'all', i + 1)
        sells = sells_data.json()['data']

        for sell in sells:
            id_tienda = sell.get('idTienda', '')
            codigo = sell.get('codigo', '')

            is_product = tkc_models.ProductSubmayorTKC.objects.filter(
                idTienda=id_tienda).exists()
            is_combo = tkc_models.ComboTKC.objects.filter(
                id_producto_tienda=id_tienda).exists()

            if not is_product and not is_combo:
                continue

            datetime_sell = (timezone.now() - datetime.timedelta(days=i + 1)
                             )

            sell_info = {
                'sell_date': datetime_sell.date(),
                'id_tienda': sell.get('idTienda', ''),
                'categoria_online': sell.get('categoria_online', ''),
                'codigo': sell.get('codigo', ''),
                'nombre': sell.get('nombre', ''),
                'owner': sell.get('owner', None),
                'suministrador': sell.get('suministrador', ''),
                'unidad_medida': sell.get('unidad_medida', ''),
                'existencia': sell.get('existencia', 0),
                'total_vendido': sell.get('total_vendido', 0),
                'precio_prov': sell.get('precio_prov', 0),
                'importe': sell.get('importe', 0),
                'precio_venta': sell.get('precio_venta', 0),
            }
            sell_instance, created = tkc_models.SellTKC.objects.update_or_create(
                **sell_info
            )

            if is_product:
                sell_instance.product_submayor_tkc = tkc_models.ProductSubmayorTKC.objects.get(
                    idTienda=id_tienda, codigo=codigo)
            elif is_combo:
                sell_instance.combo_tkc = tkc_models.ComboTKC.objects.get(
                    id_producto_tienda=id_tienda, codigo_producto=codigo)

            all_sells.append(sell_instance)

    return all_sells
