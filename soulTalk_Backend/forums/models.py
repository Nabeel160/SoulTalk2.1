from django.db import models
from django_userforeignkey.models.fields import UserForeignKey


class Post(models.Model):
    subject = models.CharField(max_length=100)
    description = models.CharField(max_length=9999)
    user = UserForeignKey(auto_user_add=True)
    added_on = models.DateField(auto_now_add=True)

    def user_username(self):
        return self.user.username

    def __str__(self):
        return self.subject



class Reply(models.Model):
    Post = models.ForeignKey(Post, on_delete=models.CASCADE)
    reply = models.CharField(max_length=9999)
    user = UserForeignKey(auto_user_add=True)
    added_on = models.DateField(auto_now_add=True)

    def __str__(self):
         return f'{self.user} - {self.Post}'
