from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('api/post/', include('apiView.urls')),
    path('api/user/', include('userView.urls')),
    path('admin/', admin.site.urls),
]

from django.conf import settings
from django.conf.urls.static import static
if settings.DEBUG:
        urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)