# Generated by Django 5.1.5 on 2025-01-25 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('userView', '0006_alter_profile_profile_pic'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='profile_pic',
            field=models.ImageField(blank=True, default='profile_pics/default.jpg', null=True, upload_to='profile_pics/'),
        ),
    ]
