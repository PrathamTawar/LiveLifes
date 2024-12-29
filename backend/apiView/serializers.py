from rest_framework import serializers
from .models import Posts
from django.contrib.auth.models import User

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    profilePic = serializers.ImageField(max_length=None, use_url=True)
    class Meta:
        model = User
        fields = ['first_name','last_name','username','password','profilePic']