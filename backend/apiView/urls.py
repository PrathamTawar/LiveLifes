from django.urls import path
from .views import *

urlpatterns = [
    path('test', test, name='test'),
    path('posts', PostView.as_view(), name='posts'),
    path('posts/<int:pk>', PostView.as_view(), name='posts'),
]
