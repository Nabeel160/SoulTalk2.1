# Generated by Django 4.2.6 on 2024-05-21 08:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctors', '0016_remove_doctors_documents'),
    ]

    operations = [
        migrations.AddField(
            model_name='doctors',
            name='documents',
            field=models.FileField(null=True, upload_to=''),
        ),
    ]
