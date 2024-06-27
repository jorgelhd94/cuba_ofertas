from django.db import models
from apps.product.models import Product


class Notification(models.Model):
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    was_read = models.BooleanField(default=False)
    # 'info', 'success', 'warning', 'error', 'new_in_ranking'
    notification_type = models.CharField(max_length=255, default='info')

    def __str__(self):
        return self.message

    class Meta:
        db_table = 'notification'


class NotificationNewInRanking(Notification):
    notification_type = 'new_in_ranking'

    class Meta:
        db_table = 'notification_new_in_ranking'

    def __str__(self):
        return self.message


class HigherRankedProducts(models.Model):
    main_product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='nr_provider_notifications')
    higher_ranked_products = models.ManyToManyField(
        Product, related_name='nr_ranked_notifications')

    notification = models.ForeignKey(
        NotificationNewInRanking, on_delete=models.CASCADE, related_name='nr_products', null=True)

    class Meta:
        db_table = 'notification_higher_ranked_products'
