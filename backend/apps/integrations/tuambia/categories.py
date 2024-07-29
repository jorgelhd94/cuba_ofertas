import requests
from apps.product.models import CategoryShop
from django.core.exceptions import ObjectDoesNotExist
from .utils import update_category_parents

def update_categories(headers, shop, proxy=None):
    print("Starting to fetch and update categories from TuAmbia...")
    
    url = "https://api.tuambia.com/ms-auth/api/categories/search/"  
    
    payload = {
        "size": 100,
        "page": 1
    }
    
    try:
        response = requests.post(url, headers=headers, data=payload)
            
        if response.status_code == 200:
            base_url = "https://www.tuambia.com/catalog?"
            categories_list = response.json()
            
            for category_data in categories_list:
                id = category_data.get("id")
                parent_id = None
                name = category_data.get("name")
                url = f"{base_url}cat={id}"
                
                new_category = {
                        "category_id": id,
                        "name": name,
                        "url": url
                    }
                parent_id = category_data.get("parent")
                if parent_id:
                    new_category["url"] = f"{base_url}cat={parent_id}&cat={id}"
                    
                try:
                    category = CategoryShop.objects.get(category_id=id, shop=shop)                           
                    for key, value in new_category.items():
                        setattr(category, key, value)
                    category.save()
                except CategoryShop.DoesNotExist:
                    new_category["shop"] = shop
                    category = CategoryShop.objects.create(**new_category) 
                
            # Update category parents
            update_category_parents(categories_list, shop)
                
                
            
            
                    
            print("------Category process completed successfully------")
        else:
            print(f"Failed to fetch categories. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")
        