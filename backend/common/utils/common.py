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
