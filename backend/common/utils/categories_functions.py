from apps.product.models import Category


# Convertir a diccionario para la salida
def category_to_dict(category):
    return {
        "id": category.id,
        "category_id": category.category_id,
        "name": category.name,
        "parent": category.parent.id if category.parent else None,
        "children": [category_to_dict(child) for child in category.children_with_products],
        "products_count": category.products_count
    }


def add_product_counts_to_tree(category, counts_dict):
    """
    Recursively add product counts to category tree and sum counts for parent categories.
    """
    total_count = 0
    children_with_products = []
    
    for child in category.children.all():
        child_count = add_product_counts_to_tree(child, counts_dict)
        if child_count > 0:
            children_with_products.append(child)
            total_count += child_count

    category.children_with_products = children_with_products
    category.products_count = total_count + counts_dict.get(category.id, 0)
    
    return category.products_count

def get_category_data(data):
    def recurse(categories, parent_id):
        result = []
        for category_id,category_data in categories.items():
            category = {}
            category['id'] = category_data['category']['id']
            category['name'] = category_data['category']['name']
            category['url'] = category_data['category']['permalink']
            children = category_data.get('children', [])
            for child in children:
                result.extend(recurse(child, category_id))
                
            category['parent_id'] = parent_id
            result.append(category)
        return result
    
    categories = data
    return recurse(categories, None)