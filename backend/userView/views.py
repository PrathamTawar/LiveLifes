from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Profile
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import ProfileSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

class signupView(APIView):
    permission_classes = []
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        full_name = request.data['full_name']
        email = request.data['email']
        profile_pic = request.FILES.get('profile_pic')
        
        
        print("-----------------------------------------------")
        print(username, password, profile_pic, full_name, email)
        print("-----------------------------------------------")
        
        profileInfo = {'profile_pic': profile_pic, 'full_name': full_name}
        
        if not username or not password:
            return Response({"success": False, "message": "username, password and email are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(username=username).exists() or email and User.objects.filter(email=email).exists():
            return Response({"success": False, "message": "username already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        
        try:
            # Create the user
            user = User.objects.create_user(username=username, password=password, email=email)
            user.save()

            # Prepare profile data
            profile_data = {'full_name': full_name, 'profile_pic': profile_pic}

            # Use serializer to validate and save profile
            profile_serializer = ProfileSerializer(data=profile_data, context={'user': user})
            if profile_serializer.is_valid():
                profile_serializer.save()
            else:
                user.delete()  # Rollback user creation if profile creation fails
                return Response({"success": False, "errors": profile_serializer.errors},
                                status=status.HTTP_400_BAD_REQUEST)

            # Create or get the token
            token, created = Token.objects.get_or_create(user=user)

            # Serialize the user data
            user_serializer = UserSerializer(user)

            return Response({
                "success": True,
                "message": "User created successfully.",
                "token": token.key,
                "user": user_serializer.data,
                "profile": profile_serializer.data
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"success": False, "message": str(e)},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
class signinView(APIView):
    permission_classes = []
    def post(self, request):
        username = request.data['username']
        password = request.data['password']
        user = ''
        
        if not username:
            email = request.data.get('email')
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({"success": False, "message": "username or password is wrong"})
        else:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                return Response({"success": False, "message": "username or password is wrong"})
        
        if not user:
            return Response({"success": False, "message": "username or password is wrong"})
        
        if not user.check_password(password):
            return Response({"success": False, "message": "invalid password"})
        
        token, created = Token.objects.get_or_create(user=user)
        
        uSerializer = UserSerializer(user)
        pSerializer = ProfileSerializer(user.profile)
        
        return Response({"success": True, "message": "user logged in successfully", "token": token.key, "user": uSerializer.data, "profile": pSerializer.data})
    
    
class getProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        pSerializer = ProfileSerializer(user.profile)
        return Response(pSerializer.data)