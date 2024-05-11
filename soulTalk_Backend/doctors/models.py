from django.db import models
from django_userforeignkey.models.fields import UserForeignKey
from django.core.validators import MaxValueValidator, MinValueValidator
from django.urls import reverse
from django_resized import ResizedImageField

class Doctors(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField()
    phone = models.IntegerField()
    address = models.CharField(max_length=1000)
    qualification = models.CharField(max_length=1000)
    user = UserForeignKey(on_delete=models.DO_NOTHING)
    image = ResizedImageField(size=[914, 927], null=True, upload_to='images')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=40)

    def get_absolute_url(self):
        return reverse('doctors:detail', kwargs={'pk': self})

    def __str__(self):
        return self.first_name


class DocReview(models.Model):
    rating = models.IntegerField(validators=[MaxValueValidator(5), MinValueValidator(1)])
    comment = models.CharField(max_length=10000)
    added_on = models.DateField(auto_now_add=True)
    user = UserForeignKey(auto_user_add=True)
    doctors = models.ForeignKey(Doctors, on_delete=models.CASCADE)

    def get_absolute_url(self):
        return f"/doctors/{self.doctors.pk}"
