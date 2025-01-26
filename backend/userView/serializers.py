from rest_framework.serializers import ModelSerializer
from .models import Profile
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id','full_name', 'bio', 'profile_pic', 'verified']
    
    def create(self, validated_data):
            
        user = self.context['user']
        return Profile.objects.create(user=user, **validated_data)