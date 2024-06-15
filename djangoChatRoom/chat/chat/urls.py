# ProjectName/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('OpenLiveChat.urls')),  # Include app's URLs
    # Add other URL patterns as needed
]
