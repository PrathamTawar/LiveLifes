from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Posts
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated


class PostView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, pk = None):
        if pk:
            data = PostSerializer(Posts.objects.get(pk=pk)).data
            return Response(data)
        data = PostSerializer(Posts.objects.all(), many = True).data
        return Response(data)
    
    def post(self, request):
        serializer = PostSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def put(self, request, pk):
        post = Posts.objects.get(pk=pk)
        serializer = PostSerializer(post, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    
    def delete(self, request, pk):
        post = Posts.objects.get(pk=pk)
        post.delete()
        return Response({'message': 'Post deleted successfully!'})

@api_view(['POST'])
def test(request):
    data = request.data.get('name')
    
    print(data)
    return Response({'message': 'Hello, world!'})   
