from rest_framework.serializers import ModelSerializer
from .models import Profile
from apiView.models import Posts
from django.contrib.auth.models import User

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id','full_name', 'bio', 'profile_pic', 'verified']
    
    def create(self, validated_data):
            
        user = self.context['user']
        return Profile.objects.create(user=user, **validated_data)
class PostSerializer(ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'
    
class UserSerializer(ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    posts = PostSerializer(many=True, source='posts_set', read_only=True)
    class Meta:
        model = User
        fields = '__all__'
    