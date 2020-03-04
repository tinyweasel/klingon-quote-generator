from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Author, Quote


class QuoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quote
        fields = ('english_text', 'klingon_text', 'author')


class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = '__all__'
