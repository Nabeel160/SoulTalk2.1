# chatroom/models.py

from django.db import models
from django_userforeignkey.models.fields import UserForeignKey
class Message(models.Model):
    user = UserForeignKey(auto_user_add=True)
    content = models.TextField()
    room = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Room(models.Model):
    name = models.CharField(max_length=100)
