# Generated by Django 4.2.6 on 2023-10-17 11:01

from django.conf import settings
from django.db import migrations
import django.db.models.deletion
import django_userforeignkey.models.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('doctors', '0006_alter_doctors_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doctors',
            name='user',
            field=django_userforeignkey.models.fields.UserForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, to=settings.AUTH_USER_MODEL),
        ),
    ]
