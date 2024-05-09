from django.db import models
from django_userforeignkey.models.fields import UserForeignKey
from django.core.validators import MaxValueValidator, MinValueValidator


class Reviews(models.Model):
    rating = models.IntegerField(validators=[MaxValueValidator(5), MinValueValidator(1)])
    comment = models.CharField(max_length=1000)
    added_on = models.DateField(auto_now_add=True)
    user = UserForeignKey(auto_user_add=True)



