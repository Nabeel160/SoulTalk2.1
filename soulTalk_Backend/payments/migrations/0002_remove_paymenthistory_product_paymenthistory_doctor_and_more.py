# Generated by Django 5.0.6 on 2024-05-12 07:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('doctors', '0009_alter_doctors_image'),
        ('payments', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='paymenthistory',
            name='product',
        ),
        migrations.AddField(
            model_name='paymenthistory',
            name='doctor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='doctors.doctors'),
        ),
        migrations.DeleteModel(
            name='Product',
        ),
    ]