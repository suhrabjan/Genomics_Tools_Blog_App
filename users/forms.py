from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Profile


class UserRegisterForm(UserCreationForm):  # Inherits from UserCreationForm
    email = forms.EmailField()  # Add fields, default required=True

    class Meta:
        model = User  # Specify Model that it going to interact with
        fields = ['username', 'email', 'password1', 'password2']  # Fields and order that will be shown within the page.


class UserUpdateForm(forms.ModelForm):
    email = forms.EmailField()  # Add fields, default required=True

    class Meta:
        model = User  # Specify Model that it going to interact with
        fields = ['username', 'email']  # Fields and order that will be shown within the page.


class ProfileUpdateForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['image']
