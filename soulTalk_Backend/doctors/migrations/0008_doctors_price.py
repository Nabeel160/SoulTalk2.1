# Generated by Django 4.2.6 on 2024-05-09 01:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctors', '0007_alter_doctors_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctors',
            name='price',
            field=models.DecimalField(decimal_places=2, default=40, max_digits=10),
        ),
    ]
