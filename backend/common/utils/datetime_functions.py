from django.utils import timezone
from datetime import timedelta

def get_previous_formatted_date(previous_days: int, format: str):
    new_date = timezone.now() - timedelta(days=previous_days)
    formatted_date = new_date.strftime(format)

    return formatted_date