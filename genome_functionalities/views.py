from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def home(request):
    return render(request, 'genome_functionalities/reverse_complement.html')


def translate(request):
    return render(request, 'genome_functionalities/translation.html')


def transcribe(request):
    return render(request, 'genome_functionalities/transcription.html')


def restrict(request):
    return render(request, 'genome_functionalities/restriction_enzymes.html')
