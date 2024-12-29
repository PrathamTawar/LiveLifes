from django.db import models

class Posts(models.Model):
    caption = models.CharField(max_length=200, blank=True)
    content_text = models.TextField(blank=True)
    content_image = models.ImageField(upload_to='images/', blank=True)
    content_video = models.FileField(upload_to='videos/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    
class User(models.Model):
    username = models.CharField(max_length=50)
    join_date = models.DateTimeField(auto_now_add=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    profilePic = models.ImageField(upload_to='profilePics/', blank=True, use_url=True)