import requests

[ {'id':1, 'nombre':'Alimentos Frescos', 'url':'...', 'parent_id': None},
  {'id':2, 'nombre':'Huevos', 'url':'...', 'parent_id':1} 
]

    
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



def update_database_kata():
    print("Starting to fetch...")
    
    url = "https://api-services.katapulk.com/api/proxy/spree/api/v1/global-categories"  
    try:
        response = requests.get(url, proxies={
        "http": "http://fpfiszuw-rotate:96zfo0p2yajy@p.webshare.io:80/",
        "https": "http://fpfiszuw-rotate:96zfo0p2yajy@p.webshare.io:80/"
        })
        if response.status_code == 200:
            categories_data = response.json()
            categories_list = categories_data.get('categories', [])[0]
            categories = get_category_data(categories_list)
            
            print(categories)
            return categories                   
        else:
            print(f"Failed to fetch categories. Status code: {response.status_code}")
    except Exception as e:
        print(f"An error occurred: {e}")
    return None
update_database_kata()






