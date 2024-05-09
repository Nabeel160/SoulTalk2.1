from django.contrib import admin
from .models import NewUser
from django.contrib.auth.admin import UserAdmin


class UserAdminConfig(UserAdmin):
    model = NewUser
    search_fields = ('email', 'username', 'first_name')
    list_filter = ('username', 'first_name', 'email', 'is_staff', 'is_doctor')
    list_display = ('username', 'first_name', 'email', 'is_staff', 'is_doctor')

    filter_horizontal = ['favorite']

    fieldsets = (
        ('Personal Information', {'fields': (tuple(['first_name','last_name']), 'gender', 'date_of_birth', 'score')}),
        ('Account Details', {'fields': ['username', 'email']}),
        ('Favorite Doctors', {'fields': ['favorite']}),
        ('Permissions', {'fields': ('is_staff', 'is_doctor')}),
    )


    add_fieldsets = (
        (None, {'classes': ('wide',),
                'fields': ('username', 'email', 'first_name', 'password1', 'password2', 'is_doctor', 'is_staff')}
         ),
    )




admin.site.register(NewUser, UserAdminConfig)
