from django.db.models.functions import Trim, Replace
from django.db.models import F, Value


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