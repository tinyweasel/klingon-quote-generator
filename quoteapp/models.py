from django.db import models


class Author(models.Model):
    author_name = models.CharField(max_length=200)

    def __str__(self):
        return self.author_name


class Quote(models.Model):
    english_text = models.CharField(max_length=300)
    klingon_text = models.CharField(max_length=300, null=True, blank=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)

    def __str__(self):
        return self.english_text


class Image(models.Model):
    image_title = models.CharField(max_length=50)
    image_source = models.CharField(max_length=300)

    def __str__(self):
        return self.image_title
