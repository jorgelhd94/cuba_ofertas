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
            product_instance, created = tkc_models.ProductSubmayorTKC.objects.update_or_create(
                id=product['id'],
                defaults={
                    'categoria_online': product.get('categoria_online', ''),
                    'idTienda': product.get('idTienda', ''),
                    'codigo': product.get('codigo', ''),
                    'nombre': product.get('nombre', ''),
                    'suministrador': product.get('suministrador', ''),
                    'unidad_medida': product.get('unidad_medida', ''),
                    'existencia_fisica': product.get('existencia_fisica', 0),
                    'almacen': product.get('almacen', ''),
                    'tienda': product.get('tienda', ''),
                    # Ajusta según corresponda
                    'user_tkc': credentials
                }
            )
            all_products.append(product_instance)
    return all_products


def create_or_update_combos(session, credentials: tkc_models.TKC_Credentials):
    combos_data = get_tkc_combos(session)
    combos = combos_data.json()

    for combo in combos:
        hijo_producto_instances = []
        for hijo in combo.get('HIJO_PRODUCTO', []):
            product_instance, created = tkc_models.ProductSubmayorTKC.objects.update_or_create(
                id=hijo['id'],
                defaults={
                    'categoria_online': hijo.get('categoria_online', ''),
                    'idTienda': hijo.get('idTienda', ''),
                    'codigo': hijo.get('codigo', ''),
                    'nombre': hijo.get('nombre', ''),
                    'suministrador': hijo.get('suministrador', ''),
                    'unidad_medida': hijo.get('unidad_medida', ''),
                    'existencia_fisica': hijo.get('existencia_fisica', 0),
                    'almacen': hijo.get('almacen', ''),
                    'tienda': hijo.get('tienda', ''),
                    'user_tkc': credentials
                }
            )
            hijo_producto_instances.append(product_instance)

        combo_instance, created = tkc_models.ComboTKC.objects.update_or_create(
            id_producto_tienda=combo['ID_PRODUCTO_TIENDA'],
            defaults={
                'codigo_producto': combo.get('CODIGO_PRODUCTO', ''),
                'nombre_producto': combo.get('NOMBRE_PRODUCTO', ''),
                'nombre_almacen': combo.get('NOMBRE_ALMACEN', ''),
                'total_producto': combo.get('TOTAL_PRODUCTO', 0),
                'created': combo.get('CREATED', timezone.now()),
                'tienda': combo.get('tienda', ''),
                'peso': combo.get('PESO', 0),
                'pv': combo.get('PV', 0),
                'user_tkc': credentials
            }
        )
        combo_instance.childrens.set(hijo_producto_instances)

    return combos


def create_or_update_sells(session):
    all_sells = []
    for i in range(7):
        date = (timezone.now() - datetime.timedelta(days=i + 1)
                ).strftime('%Y-%m-%d')
        sells_data = get_tkc_sells_report(session, 'all', date)
        sells = sells_data.json()['data']

        for sell in sells:
            sell_instance, created = tkc_models.SellTKC.objects.update_or_create(
                id=sell['id'],
                defaults={
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
                    'fecha_venta': date,
                    'combo_tkc': None,  # Ajusta según corresponda
                    'product_submayor_tkc': None  # Ajusta según corresponda
                }
            )
            all_sells.append(sell_instance)
    return all_sells
