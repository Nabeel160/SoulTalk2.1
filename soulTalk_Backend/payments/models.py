from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Product(models.Model):
    name=models.CharField(max_length=100)
    price=models.DecimalField(max_digits=10, decimal_places=2)
    product_image=models.ImageField(upload_to="media")
    book_url=models.URLField()
    def __str__(self):
        return self.name

class PaymentHistory(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
    product=models.ForeignKey(Product, on_delete=models.SET_NULL, blank=True, null=True)
    date=models.DateTimeField(auto_now_add=True)
    payment_status=models.BooleanField()


    def __str__(self):
        return self.product.name