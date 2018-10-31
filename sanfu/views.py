import hashlib
import os
import uuid

from django.http import HttpResponse
from django.shortcuts import render, redirect, render_to_response

# Create your views here.
from myproject import settings
from sanfu.models import User, Banner


# 加密
def generate_password(password):
    sha = hashlib.sha512()
    sha.update(password.encode('utf-8'))
    return sha.hexdigest()

def index(request):
    banner = Banner.objects.all()
    urllist = []
    for i in banner:
        urllist.append('static/' + i.url)
    token = request.COOKIES.get('token')
    users = User.objects.filter(token=token)
    if users.exists():
        user = users.first()
        headImg = 'static/img/headImg/'+ user.userhead
        return render(request, 'index.html', context={'username':user.username,'urllist':urllist,'userhead':headImg})
    else:
        return render(request,'index.html',context={'urllist':urllist})

def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        username = request.POST.get('loginName')
        userpassword = generate_password(request.POST.get('loginPwd'))
        users = User.objects.filter(username=username).filter(userpassword=userpassword)
        if users.count():
            user = users.first()
            user.token = uuid.uuid5(uuid.uuid4(),username)
            user.save()
            response = redirect('sanfu:index')
            response.set_cookie('token', user.token)
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
        response = render_to_response('regiest.html')
        response.delete_cookie('token')
        return response
    elif request.method == 'POST':
        username = request.POST.get('username')
        userpassword = request.POST.get('password')
        # 存入数据库
        try:
            user = User()
            user.username = username
            # 密码加密
            user.userpassword = generate_password(userpassword)
            # token 生成
            user.token = uuid.uuid5(uuid.uuid4(), username)
            user.save()
            response = redirect('sanfu:index')
            response.set_cookie('token',user.token)
            return response
        except Exception as e:
            im = '注册失败 用户名已存在'
            return render(request,'regiest.html', context={'im': im})

def outlogin(request):
    response = redirect('sanfu:index')
    response.delete_cookie('token')
    return response


def uploadhead(request):
    if request.method == 'GET':
        return render(request, 'uploadhead.html')
    elif request.method == 'POST':
        file = request.FILES.get('userhead')
        token = request.COOKIES.get('token')
        users = User.objects.filter(token=token)
        user = users.first()
        filename = user.username + '-' + file.name
        filepath = os.path.join(settings.MEDIA_ROOT, filename)

        with open(filepath, 'wb') as fp:
            for item in file.chunks():
                fp.write(item)
        fp.close()
        user.userhead = filename
        user.save()
        response = redirect('sanfu:index')
        return response
