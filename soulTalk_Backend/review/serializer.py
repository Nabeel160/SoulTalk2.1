from rest_framework import serializers
from .models import Reviews
from user.serializer import UserSerializer


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Reviews
        fields = ('rating', 'comment', 'added_on', 'user')

    def get_queryset(self):
        return Reviews.objects.all().order_by('-added_on')

