from rest_framework import serializers
from apps.notifications.models import Notification, NotificationNewInRanking, HigherRankedProducts
from apps.product.serializers import ProductSerializer


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['id', 'message', 'created_at', 'was_read', 'notification_type']
        read_only_fields = fields


class NotificationNewInRankingSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationNewInRanking
        fields = ['id', 'message', 'created_at', 'was_read', 'notification_type']
        read_only_fields = fields


class HigherRankedProductsSerializer(serializers.ModelSerializer):
    main_product = ProductSerializer(read_only=True)
    higher_ranked_products = ProductSerializer(many=True, read_only=True)
    notification = NotificationNewInRankingSerializer(read_only=True)

    class Meta:
        model = HigherRankedProducts
        fields = ['id', 'main_product', 'higher_ranked_products', 'notification']
        read_only_fields = fields