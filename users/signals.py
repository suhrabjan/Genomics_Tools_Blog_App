from django.db.models.signals import post_save  # post_save is a signal that is fired when new user is created.
from django.contrib.auth.models import User  # User model will be the sender of the signal
from django.dispatch import receiver  # receives the signal
from .models import Profile  # a profile will be generated and added to databse table


@receiver(post_save, sender=User)  # When a User is saved send a signal, this signal will be received by this receiver
def create_profile(sender, instance, created, **kwargs):  # And the receiver is this function
    if created:  # if the user is created
        Profile.objects.create(user=instance)  # then create a profile object with user equal to the instance of the user that was created


@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):  # This saves the profile that was created.
    instance.profile.save()
