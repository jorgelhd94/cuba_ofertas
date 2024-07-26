from django.db.models.functions import Trim, Replace
from django.db.models import F, Value

from apps.product.models import Product
from django.db.models import Count


def clean_name_trim():
    return Trim(
        Replace(
            Replace(
                Replace(F('name'), Value('\t'), Value('')),
                Value('\r'), Value('')
            ),
            Value('\n'), Value('')
        )
    )

# Function to remove duplicates based on 'id'
def remove_duplicates(data):
    seen_ids = set()
    return [item for item in data if not (item["id"] in seen_ids or seen_ids.add(item["id"]))]


def search_duplicate_products(shop_id=None):
    if shop_id is not None:
        duplicates = Product.objects.values('product_id').annotate(product_count=Count('product_id')).filter(product_count__gt=1, shop_id=shop_id)
    else:
        duplicates = Product.objects.values('product_id', 'shop_id').annotate(product_count=Count('product_id')).filter(product_count__gt=1)
        
    return duplicates