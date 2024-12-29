from django.db import models

class Posts(models.Model):
    caption = models.CharField(max_length=200, blank=True)
    content_text = models.TextField(blank=True)
    content_image = models.ImageField(upload_to='images/', blank=True)
    content_video = models.FileField(upload_to='videos/', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    