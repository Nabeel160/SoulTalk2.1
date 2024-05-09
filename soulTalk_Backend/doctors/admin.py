from django.contrib import admin
from .models import Doctors, DocReview
from django.contrib.auth.admin import UserAdmin


class DoctorAdminConfig(admin.ModelAdmin):
    model = Doctors
    search_fields = ("first_name", "last_name", "qualification")
    list_filter = ('first_name', 'last_name', 'qualification', 'age')
    list_display = ('first_name', 'last_name', 'qualification', 'age')


class DocReviewAdminConfig(admin.ModelAdmin):
    model = DocReview
    search_fields = ("comment", "rating", "user_username", "doctors")
    list_filter = ('comment', 'rating', 'doctors', "added_on")
    list_display = ('comment', 'rating', 'doctors', "added_on")

    def user_username(self, obj):
        return obj.user.username if obj.user else None


admin.site.register(Doctors, DoctorAdminConfig)
admin.site.register(DocReview, DocReviewAdminConfig)
