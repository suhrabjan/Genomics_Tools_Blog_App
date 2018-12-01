from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm
from django.contrib.auth.decorators import login_required
from PIL import Image
import io


def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():  # This checks with backend whether such user was created or not. Also checks whether passwords match or does not and so on.
            form.save()  # This adds the new user to the database and we can check it both in admin page as well as in terminal.
            username = form.cleaned_data.get('username')
            messages.success(request, f'Your account has been created! You are now able to login')
            return redirect('login')  # You want to do a redirect here instead of falling down to return render below. The reason is POST GET redirect pattern, which means that for example, when you submit a post request and then refresh the page, browser asks to do you want to resubmit, this redirecting prevents this.
    else:
        form = UserRegisterForm()
    return render(request, 'users/register.html', {'form': form})


@login_required
def profile(request):
    if request.method == 'POST':

        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST,
                                   request.FILES,
                                   instance=request.user.profile)
        print(request.FILES)
        print(p_form)
        if u_form.is_valid() and p_form.is_valid():
            # First Adjust photo size
            original = request.FILES['image'].file
            im = Image.open(original)
            if im.width > 300 or im.height > 300:
                im.thumbnail((300, 300), Image.ANTIALIAS)
                temp = io.BytesIO()
                extension = request.FILES['image'].content_type.split('/')[-1]
                print(extension)
                im.save(temp, extension)
                request.FILES['image'].image = im
                request.FILES['image'].file = temp
            u_form.save()
            p_form.save()
            messages.success(request, f'Your account has been updated!')
            return redirect('profile')  # profile is the name of the profile.html that we saved in the main urls.py
    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)

    context = {
        'u_form': u_form,
        'p_form': p_form
    }
    return render(request, 'users/profile.html', context)
