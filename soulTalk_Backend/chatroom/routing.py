from django.urls import path,re_path
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from .consumers import ChatConsumer

websocket_urlpatterns = [
    path('ws/chat/<str:channel_name>', ChatConsumer.as_asgi()),
]
