# Generated by Django 4.2.13 on 2024-06-15 05:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ChatMessage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=100)),
                ('message', models.TextField()),
                ('original_chat_datetimestamp', models.DateTimeField()),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
