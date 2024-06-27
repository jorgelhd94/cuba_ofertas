from django.contrib.postgres.search import TrigramWordDistance
from django.contrib.postgres.search import TrigramWordSimilarity
from django.contrib.postgres.search import TrigramSimilarity
from apps.product.models import Category, Product
from django.db.models import Q, F, Value
from django.db.models.functions import Replace, Trim
from django.db.models.expressions import Func
from django.db import models
from functools import reduce
from django.contrib.postgres.search import SearchQuery, SearchRank
import re
from django.contrib.postgres.search import SearchQuery, SearchRank, SearchVector


class Unaccent(Func):
    function = 'unaccent'
    output_field = models.CharField()


def search_products(query):
    search_words = query.split()
    # Normalizar el término de búsqueda
    unaccented_search_words = [Unaccent(Value(word)) for word in search_words]

    unaccented_query = reduce(
        lambda q, word: q & Q(unaccent_name__icontains=word),
        unaccented_search_words,
        Q()
    )

    products_queryset = Product.objects.annotate(
        unaccent_name=Unaccent(Replace(Replace(Replace(Trim(F('name')), Value(
            '\t'), Value('')), Value('\r'), Value('')), Value('\n'), Value('')))
    ).filter(unaccented_query)

    return products_queryset


def full_search_products(query):
    filtered_words = [word for word in query.split() if len(
        word) >= 4 and not re.search(r'\d', word)]

    if len(filtered_words) > 2:
        search_query = SearchQuery(filtered_words[0], config='spanish')
        for word in filtered_words[1:]:
            search_query |= SearchQuery(word, config='spanish')
    else:
        return search_products(query)

    search_vector = SearchVector('name', config='spanish')

    products_queryset = Product.objects.annotate(
        rank=SearchRank(search_vector, search_query),
    ).filter(rank__gte=0.03).order_by("-rank")

    if products_queryset.count() == 0:
        products_queryset = search_products(query)

    return products_queryset


def filter_by_price_weight(products_queryset, param):
    if not param in ['with_price_weight', 'without_price_weight']:
        return products_queryset

    if param == 'with_price_weight':
        products_queryset = products_queryset.filter(
            Q(price_by_weight__isnull=False) | Q(price_by_weight__gt=0))

    if param == 'without_price_weight':
        products_queryset = products_queryset.filter(
            Q(price_by_weight__isnull=True) | Q(price_by_weight__lt=0))

    return products_queryset


def is_combo_product(product):

    regex = re.compile(r'\(\b\d+ x +\b\d* +[a-zA-Z]*', re.IGNORECASE)

    if regex.search(product.name):
        return True

    if 'combo' in product.name.lower():
        return True

    descendant_category_ids = get_descendant_category_ids('Combos')

    if product.categories.filter(id__in=descendant_category_ids).exists():
        return True

    return False


def filter_products_by_mode(products_queryset, mode):
    if mode in ['combo', 'simple']:
        # Obtén las IDs de las categorías descendientes de 'Combos'
        descendant_category_ids = get_descendant_category_ids(
            'Combos')

        # Filtra los productos por el nombre que incluya "Combo"
        combo_name_filtered_ids = filter_products_by_combo_name(
            products_queryset)

        # Incluye productos cuyo nombre contenga "Combo"
        products_with_combo_in_name = products_queryset.filter(
            name__icontains='Combo').values_list('id', flat=True)

        # Agrega los IDs de los productos con "Combo" en el nombre a los IDs filtrados por nombre de combo
        combo_name_filtered_ids = list(
            set(combo_name_filtered_ids).union(set(products_with_combo_in_name)))

        if mode == 'combo':
            products_queryset = products_queryset.filter(
                Q(categories__id__in=descendant_category_ids) | Q(
                    id__in=combo_name_filtered_ids)
            )
        elif mode == 'simple':
            products_queryset = products_queryset.exclude(
                Q(categories__id__in=descendant_category_ids) | Q(
                    id__in=combo_name_filtered_ids)
            )

    return products_queryset


def get_valid_page(request, query_params, paginator, products_queryset_count):
    # Validar página proporcionada
    page_number = query_params.get(paginator.page_query_param, 1)

    try:
        page_number = int(page_number) if int(page_number) > 0 else 1
    except:
        page_number = 1

    page_size = paginator.get_page_size(request)
    total_items = products_queryset_count
    total_pages = (total_items + page_size - 1) // page_size

    if page_number > total_pages:
        return 1

    return page_number


def get_descendant_category_ids(category_name):
    try:
        category = Category.objects.get(name=category_name)
        descendant_categories = category.get_descendants()
        descendant_category_ids = [
            category.id for category in descendant_categories]
        descendant_category_ids.append(category.id)
        return descendant_category_ids
    except Category.DoesNotExist:
        return []


def filter_products_by_combo_name(products_queryset):
    regex = re.compile(r'\(\b\d+ x +\b\d* +[a-zA-Z]*', re.IGNORECASE)
    filtered_products = []

    for product in products_queryset:
        if regex.search(product.name):
            filtered_products.append(product.id)

    return filtered_products


def get_products_cleaned_name(products_queryset: models.QuerySet):
    return products_queryset.annotate(
        cleaned_name=Trim(
            Replace(
                Replace(
                    Replace(F('name'), Value('\t'), Value('')),
                    Value('\r'), Value('')
                ),
                Value('\n'), Value(''),
            )
        )
    )
