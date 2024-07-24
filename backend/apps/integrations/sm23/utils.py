from apps.product.models import Product
from apps.product.models import CategoryShop

def add_or_get_category(category_data, shop):
    category_base_url = 'https://www.supermarket23.com/es/categoria'
    try:
        category = CategoryShop.objects.get(
            category_id=category_data['category_id'],
            shop=shop
        )
        return category
    except CategoryShop.DoesNotExist:
        external_id = category_data['category_id']
        url = f'{category_base_url}/{external_id}'
        
        category = CategoryShop.objects.create(
            category_id=external_id,
            url=url,
            name=category_data['category_name'],
            shop=shop
        )
        return category
    
def update_category(category_dict, shop):
    parent = None
    grandparent = None
    greatgrandparent = None
    
    category= add_or_get_category(category_dict['category'], shop)
    
    if category_dict['category_father']['category_name'] is not None:
        parent = add_or_get_category(category_dict['category_father'], shop)
        category.parent = parent
        category.save()
        if category_dict['category_grandfather']['category_name'] is not None:
            grandparent = add_or_get_category(category_dict['category_grandfather'], shop)
            parent.parent = grandparent
            parent.save()
            if category_dict['category_greatgrandfather']['category_name'] is not None:
                grandparent = add_or_get_category(category_dict['category_greatgrandfather'], shop)
                grandparent.parent = greatgrandparent
                grandparent.save()

def add_if_no_exists(item, item_list):
    new_list = item_list
    added = False
    if item not in item_list:
        new_list.append(item)
        added = True
    return new_list, added

def search_duplicate_products():
    products = Product.objects.filter(shop_id=1)
    
    duplicates = []
    
    for product in products:
        cant = 0
        for p in products.exclude(pk=product.id):
            if product.product_id == p.product_id:
                cant += 1 
                duplicates.append({'product': product, 'cant': cant})
                
    return duplicates