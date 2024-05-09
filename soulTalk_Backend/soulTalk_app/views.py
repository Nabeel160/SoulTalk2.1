from django.shortcuts import render
from rest_framework import viewsets
from .serializer import TodoSerializer
from .models import Todo

from django.contrib.auth import views as auth_views
from rest_framework import status
from rest_framework.response import Response

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()