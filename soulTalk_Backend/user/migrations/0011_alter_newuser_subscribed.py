# Generated by Django 4.2.6 on 2024-05-20 23:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('doctors', '0013_alter_doctors_image'),
        ('user', '0010_alter_newuser_subscribed'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newuser',
            name='subscribed',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='subscribed_doctor', to='doctors.doctors'),
        ),
    ]