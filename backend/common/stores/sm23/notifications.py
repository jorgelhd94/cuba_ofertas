from apps.statistics_spy.models import ProductsUpdateLogs
from apps.product.models import Product
from apps.notifications.models import Notification, HigherRankedProducts
from common.utils import search_functions
from django.db.models import Q

from django.utils import timezone


def notify_higher_ranked_products_sm23():
    # Obtener la última actualización exitosa
    last_update = ProductsUpdateLogs.objects.filter(
        status='success').order_by('-end_time').first()

    if not last_update:
        return []

    last_update_date = last_update.start_time

    # Productos con proveedores
    products_with_providers = Product.objects.filter(provider__isnull=False)

    # Productos nuevos o actualizados
    new_or_updated_products = Product.objects.filter(
        Q(created_at__gte=last_update_date) |
        (Q(previous_price_updated_at__gte=last_update_date) & Q(provider__isnull=True))
    )

    all_higher_ranked_products = []

    for product in products_with_providers:
        # Obtener productos ordenados
        ranked_products = search_functions.full_search_products(
            product.name).order_by('current_price')

        # Limpiar nombres de productos
        ranked_products = search_functions.get_products_cleaned_name(
            ranked_products)

        # Filtrar productos por modo (combo/simple)
        if search_functions.is_combo_product(product):
            ranked_products = search_functions.filter_products_by_mode(
                ranked_products, 'combo')
        else:
            ranked_products = search_functions.filter_products_by_mode(
                ranked_products, 'simple')

        # Convertir a lista para poder usar index()
        ranked_products = list(ranked_products)

        if product in ranked_products:
            product_position = ranked_products.index(product)
            higher_ranked_products = [
                p for p in ranked_products[:product_position] if p in new_or_updated_products
            ]

            if higher_ranked_products:
                hrp = HigherRankedProducts.objects.create(
                    main_product=product,
                )
                hrp.higher_ranked_products.set(higher_ranked_products)

                all_higher_ranked_products.append(hrp)

    if all_higher_ranked_products:
        # Verificar si ya existe una notificación de tipo 'new_in_ranking' creada hoy
        today = timezone.now().date()
        notification = Notification.objects.filter(
            created_at__date=today,
        ).first()

        if notification:
            # Si existe, actualizar el mensaje y los productos asociados
            notification.message = "Hay nuevos productos con mejores precios que los nuestros. Hay en total {} de nuestros productos afectados.".format(
                len(all_higher_ranked_products))
            notification.save()

            # Eliminar las instancias de HigherRankedProducts existentes asociadas a la notificación
            notification.nr_products.all().delete()
        else:
            # Crear una notificación
            notification = Notification.objects.create(
                notification_type='new_in_ranking',
            )

            # Crear una nueva notificación si no existe
            notification.message = "Hay nuevos productos con mejores precios que los nuestros. Hay en total {} de nuestros productos afectados.".format(
                len(all_higher_ranked_products))

        for hrp in all_higher_ranked_products:
            hrp.notification = notification
            hrp.save()

        notification.save()
