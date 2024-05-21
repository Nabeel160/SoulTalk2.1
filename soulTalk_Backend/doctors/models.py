from django.db import models
from django_userforeignkey.models.fields import UserForeignKey
from django.core.validators import MaxValueValidator, MinValueValidator
from django.urls import reverse
from django_resized import ResizedImageField
from multiupload.fields import MultiFileField
from django.core.files.storage import default_storage


def upload_to(instance, filename):
    today = timezone.now()
    return f'images/{today.year}/{today.month}/{filename}'

class Doctors(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    age = models.IntegerField(null=True)
    phone = models.IntegerField(null=True)
    address = models.CharField(max_length=1000, null=True)
    qualification = models.CharField(max_length=1000, null=True)
    user = UserForeignKey(on_delete=models.DO_NOTHING, null=True)
    image = ResizedImageField(size=[914, 927], null=True, upload_to='images')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=40, null=True)
    documents = models.FileField(null=True)
    active = models.BooleanField(default=False)

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
