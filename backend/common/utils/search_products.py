from apps.product.models import Category, Product
from django.db.models import Q, F, Value
from django.db.models.functions import Replace, Trim
from django.db.models.expressions import Func
from django.db import models
from functools import reduce
import re


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
        unaccent_name=Unaccent(Replace(Replace(Replace(Trim(F('name')), Value('\t'), Value('')), Value('\r'), Value('')), Value('\n'), Value('')))
    ).filter(unaccented_query)

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
        descendant_category_ids = [category.id for category in descendant_categories]
        descendant_category_ids.append(category.id)
        return descendant_category_ids
    except Category.DoesNotExist:
        return []


def filter_products_by_combo_name(products_queryset):
    regex = re.compile(r'\(\b\d+ x +\b\d* +[a-zA-Z]*\)')
    filtered_products = []

    for product in products_queryset:
        if regex.search(product.name):
            filtered_products.append(product.id)

    return filtered_products