# chatroom/serializer.py

from rest_framework import serializers
from .models import Message
from user.serializer import UserSerializer

class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = ['content', 'timestamp', 'user', 'room']
