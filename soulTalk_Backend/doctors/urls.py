from django.urls import path
from .views import ProductPreview, CreateCheckOutSession, stripe_webhook_view
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [

    path('stripe-webhook/', stripe_webhook_view, name='stripe-webhook'),
    path('get_token/', views.getToken)
]

