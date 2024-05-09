from django.contrib import admin
from .models import Reviews


class ReviewsAdminConfig(admin.ModelAdmin):
    model = Reviews
    search_fields = ("rating", "user_username")
    list_filter = ('comment', 'rating', 'user', "added_on")
    list_display = ('comment', 'rating', 'user_username', "added_on")

    def user_username(self, obj):
        return obj.user.username if obj.user else None

    def save_model(self, request, obj, form, change):
        # Set the user field if it's not already set
        if not obj.user_id:
            obj.user = request.user
        obj.save()


admin.site.register(Reviews, ReviewsAdminConfig)