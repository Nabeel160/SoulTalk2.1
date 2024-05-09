from django.contrib import admin
from .models import Post, Reply


class PostAdminConfig(admin.ModelAdmin):
    model = Post
    search_fields = ("subject", "user_username")
    list_filter = ('subject', 'user', "added_on")
    list_display = ('subject', 'user', "added_on")


class ReplyAdminConfig(admin.ModelAdmin):
    model = Reply
    search_fields = ("user_username", "added_on")
    list_filter = ('user', "added_on")
    list_display = ('reply', 'user_username', "added_on")

    def user_username(self, obj):
        return obj.user.username if obj.user else None


admin.site.register(Post, PostAdminConfig)
admin.site.register(Reply, ReplyAdminConfig)