from django.contrib import admin
from .models import Message
from django.contrib.auth.admin import UserAdmin

class MessageAdminConfig(admin.ModelAdmin):
    model = Message
    list_filter = ['content', 'timestamp', 'user']
    list_display = ['content', 'timestamp', 'user']

admin.site.register(Message, MessageAdminConfig)