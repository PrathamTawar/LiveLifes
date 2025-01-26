from rest_framework import serializers
from .models import Posts
from django.contrib.auth.models import User
from userView.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id','profile_pic']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'profile']

class PostSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    class Meta:
        model = Posts
        fields = '__all__'
        
    def create(self, validated_data):
            
        owner = self.context['user']
        return Posts.objects.create(owner=owner, **validated_data)
        