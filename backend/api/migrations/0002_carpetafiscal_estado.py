# Generated by Django 4.2.16 on 2024-12-02 06:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='carpetafiscal',
            name='estado',
            field=models.BooleanField(default=True),
        ),
    ]
