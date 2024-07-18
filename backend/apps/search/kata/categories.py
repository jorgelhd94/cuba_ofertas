import requests
from apps.product.models import CategoryShop, Shop
from common.utils.categories_functions import get_category_data
from django.core.exceptions import ObjectDoesNotExist


def update_categories(proxy=None):
    print("Starting to fetch categories...")
    
    url = "https://api-services.katapulk.com/api/proxy/spree/api/v1/global-categories"  
    
    try:
        if proxy:
            response = requests.get(url, proxies={
            "http": proxy,
            "https": proxy
            })
        else:
            response = requests.get(url)
            
        if response.status_code == 200:
            categories_data = response.json()
            categories_list = categories_data.get('categories', [])[0]["8647"]['children']
            categories = []
            for category in categories_list:
                categories_info = get_category_data(category)
                categories.extend(categories_info)
            
            shop = Shop.objects.get(slug='kata')
            
            print("Adding categories to db if not exists...")
            for category in categories:
                existing_category = CategoryShop.objects.filter(category_id=category["id"])
                if not existing_category:
                    new_category = CategoryShop(
                                category_id=category["id"],
                                name=category["name"],
                                url=category["url"],
                                shop=shop)
                    new_category.save()
            
            print("Adding parent_id to categories...")
            categories_with_parents = []
            for category in categories:
                parent_id = category.get("parent_id")
                if parent_id:
                    parent_category = CategoryShop.objects.filter(category_id=parent_id).first()
                    if parent_category:
                        category["parent_in_db"] = parent_category.id
                categories_with_parents.append(category)
            
            for category in categories_with_parents:
                try:
                    db_category = CategoryShop.objects.get(category_id=category["id"])
                    db_category.parent_id = category.get("parent_in_db")
                    db_category.save()
                except ObjectDoesNotExist:
                    print(f"Category with ID {category['id']} not found.")
                    
            print("------Category process finished------")
            return categories_with_parents                   
        else:
            print(f"Failed to fetch categories. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")
        
    return None