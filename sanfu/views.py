from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from sanfu.models import User


def index(request):
    username = request.COOKIES.get('username')
    return render(request, 'index.html', context={'username':username})


def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        username = request.POST.get('loginName')
        userpassword = request.POST.get('loginPwd')
        users = User.objects.filter(username=username).filter(userpassword=userpassword)
        if users.count():
            user = users.first()
            response = redirect('sanfu:index')
            response.set_cookie('username', user.username)
            return response
        else:
            response = redirect('sanfu:login')
            return response


def cart(request):
    return render(request, 'cart.html')


def goodsList(request):
    return render(request,'goodsList.html')


def goodMsg(request):
    return render(request, 'goodsMsg.html')


def regiest(request):
    if request.method == 'GET':
        username = request.COOKIES.get('username')
        return render(request, 'regiest.html',context={'username':username})
    elif request.method == 'POST':
        user = User()
        username = request.POST.get('username')
        user.username = username
        user.userpassword = request.POST.get('password')
        user.save()
        response = redirect('sanfu:index')
        response.set_cookie('username', username)
        return response


def outlogin(request):
    response = redirect('sanfu:index')
    response.delete_cookie('username')
    return response
