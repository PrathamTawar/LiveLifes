from django.urls import path
from .views import *

urlpatterns = [
    path('signup', signupView.as_view(), name='signup'),
    path('signin', signinView.as_view(), name='signin'),
    path('profile', getProfileView.as_view(), name='profile'),
]
