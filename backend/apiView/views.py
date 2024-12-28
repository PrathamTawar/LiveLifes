from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Posts
from .serializers import PostSerializer


@api_view(['GET'])
def test(request):
    return Response({'message': 'Hello, world!'})   

@api_view(['GET'])
def getPost(request, pk):
    if pk != 0:
        data = PostSerializer(Posts.objects.get(pk=pk)).data
        return Response(data)
    data = PostSerializer(Posts.objects.all(), many = True).data
    return Response(data)

@api_view(['POST'])
def createPost(request):
    serializer = PostSerializer(data = request.data)
    print(request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)



@api_view(['PUT'])
def updatePost(request, pk):
    post = Posts.objects.get(pk=pk)
    serializer = PostSerializer(post, data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)


@api_view(['DELETE'])
def deletePost(request, pk):
    post = Posts.objects.get(pk=pk)
    post.delete()
    return Response({'message': 'Post deleted successfully!'})