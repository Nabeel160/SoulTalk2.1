# Generated by Django 4.2.6 on 2024-05-21 00:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctors', '0013_alter_doctors_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctors',
            name='active',
            field=models.BooleanField(default=False),
        ),
    ]
