def get_manufacture_ids_from_params(query_params):
    ids_param = query_params.get('manufactures', '')
    ids = []
    if ids_param:
        try:
            ids = [int(id.strip()) for id in ids_param.split(',')]
        except ValueError:
            return []
    return ids
