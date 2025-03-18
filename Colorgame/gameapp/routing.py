# filepath: c:\Users\sujee\OneDrive\Desktop\Development\game2\Colorgame\gameapp\routing.py
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/gamehome/$', consumers.GameConsumer.as_asgi()),
]