from django.urls import path
from .views import *

urlpatterns = [
    path('test', test, name='test'),
    path('', PostView.as_view(), name='posts'),
    path('<int:pk>', PostView.as_view(), name='posts')
]