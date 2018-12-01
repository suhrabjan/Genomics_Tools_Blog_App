from django.db import models
from django.contrib.auth.models import User
from django.core.files.storage import default_storage
from django.conf import settings
from PIL import Image


class Profile(models.Model):  # Model name Profile inherits from models.Model
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # one to one relation between profile and User. CASCADE means when user is deleted the profile is deleted as well but not the other way.
    image = models.ImageField(default='default.png', upload_to='profile_pics')  # profile_pics will be a directory, which will store the the images uploaded.

    def __str__(self):
        return f'{self.user.username} Profile'

    def save(self, **kwargs):
        super().save()
