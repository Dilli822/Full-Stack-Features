# OnlineLiveChat/models.py

from django.db import models

class ChatMessage(models.Model):
    username = models.CharField(max_length=100)
    message = models.TextField()
    original_chat_datetimestamp = models.DateTimeField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.username} - {self.message} ({self.timestamp})'

