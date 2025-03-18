from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import logout
from django.shortcuts import redirect   
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

# Create your views here.

def index(request):
    if request.method == 'POST' :
        username = request.POST['username']
        password = request.POST['password']
        user = User.objects.create_user(username=username, password=password)
        user.save()
        return HttpResponse('User created successfully')
    return render(request, 'index.html')


def loginpage(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('gamehome')
        else:
            return HttpResponse('Invalid credentials')
    return render(request, 'loginpage.html')

      

@login_required
def gamehome(request):
    context = {
        'username': request.user.username,
        'user_id': request.user.id
    }
    return render(request, 'gamehome.html',context)


    def logout(request):
       logout(request)
    return redirect('loginpage')

