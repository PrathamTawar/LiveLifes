from django.urls import path
from . import views

urlpatterns = [
    path('test', views.test, name='test'),
    path('getPost/<int:pk>', views.getPost, name='getPost'),
    path('createPost', views.createPost, name='createPost'),
    path('updatePost/<int:pk>', views.updatePost, name='createPost'),
    path('deletePost/<int:pk>', views.deletePost, name='deletePost'),
]

from django.conf import settings
from django.conf.urls.static import static
if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)