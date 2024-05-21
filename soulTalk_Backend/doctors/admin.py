from django.contrib import admin
from .models import Doctors, DocReview
from ckeditor.fields import RichTextField
from ckeditor.widgets import CKEditorWidget
from django.contrib.auth.admin import UserAdmin
from django.db import models
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django import forms
from multiupload.fields import MultiFileField


class YourModelForm(forms.ModelForm):
    multi_files = MultiFileField(max_file_size=1024 * 1024 * 5, max_num=10)

    class Meta:
        model = Doctors
        fields = '__all__'


class DoctorAdminConfig(admin.ModelAdmin):
    model = Doctors
    form = YourModelForm
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
