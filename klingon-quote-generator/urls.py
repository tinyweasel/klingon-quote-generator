from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from quoteapp import views

router = routers.DefaultRouter()
router.register(r'quotes', views.QuoteViewSet)
router.register(r'authors', views.AuthorViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    path('admin/', admin.site.urls),
]