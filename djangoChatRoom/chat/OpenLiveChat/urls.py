# OnlineLiveChat/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('chat-messages/', views.ChatMessageListCreateAPIView.as_view(), name='chat-message-list-create'),
    path('chat-messages/<int:pk>/', views.ChatMessageDetailAPIView.as_view(), name='chat-message-detail'),
]
