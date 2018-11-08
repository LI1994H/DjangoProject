import hashlib
import os
import random
import uuid

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, render_to_response

# Create your views here.
from myproject import settings
from sanfu.models import User, Banner, Newhot, Hotsingle, Mens, Womens, Goodsdetail, GoodList, Cart


# 加密
def generate_password(password):
    sha = hashlib.sha512()
    sha.update(password.encode('utf-8'))
    return sha.hexdigest()


def index(request):
    banners = Banner.objects.all()
    urllist = []
    for banner in banners:
        urllist.append('static/' + banner.url)
    token = request.COOKIES.get('token')
    users = User.objects.filter(token=token)

    # 随机选择5个商品
    def randomgoods(data):
        randomnum = range(0, len(data))
        num = random.sample(randomnum, 4)
        goods = []
        for i in num:
            goods.append(data[i])
        return goods

    # 热卖新品数据
    allnewhots = Newhot.objects.all()
    newhots = randomgoods(allnewhots)
    # 热卖单品
    allhotsingle = Hotsingle.objects.all()
    hostsingles = randomgoods(allhotsingle)
    # 男装
    allmens = Mens.objects.all()
    mens = randomgoods(allmens)
    # 女装
    allwomnes = Womens.objects.all()
    womens = randomgoods(allwomnes)
    data = {
        "urllist": urllist,
        'newhots': newhots,
        'hostsingles': hostsingles,
        'mens': mens,
        'womens': womens,
    }
    if users.exists():
        user = users.first()
        headImg = 'static/img/headImg/' + user.userhead
        userdata = {
            'username': user.username,
            'userhead': headImg
        }
        data.update(userdata)
        return render(request, 'index.html', context=data)
    else:
        return render(request, 'index.html', context=data)


def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        username = request.POST.get('loginName')
        userpassword = generate_password(request.POST.get('loginPwd'))
        users = User.objects.filter(username=username).filter(userpassword=userpassword)
        if users.count():
            user = users.first()
            user.token = uuid.uuid5(uuid.uuid4(), username)
            user.save()
            response = redirect('sanfu:index')
            response.set_cookie('token', user.token)
            return response
        else:
            return render(request, 'login.html', context={'msg': '用户名或密码错误'})


def cart(request):
    token = request.COOKIES.get('token')
    if token:
        user = User.objects.get(token=token)
        userhead = 'static/img/headImg/' + user.userhead
        cart = Cart.objects.filter(user=user)
        data = {
            'username': user.username,
            'userhead': userhead,
            'cart': cart,
        }
        return render(request, 'cart.html', context=data)
    return render(request, 'login.html')


def goodsList(request):
    return render(request, 'goodsList.html')


def goodMsg(request, goodsid):
    goodsdatail = Goodsdetail.objects.get(goodsid=goodsid)
    goodsdata = GoodList.objects.filter(goodsid=goodsid)
    goodsdata = goodsdata.first()
    token = request.COOKIES.get('token')
    user = User.objects.get(token=token)
    data = {
        'username': user.username,
        'goodsdatail': goodsdatail,
        'goodsdata': goodsdata
    }
    return render(request, 'goodsMsg.html', context=data)


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
            response.set_cookie('token', user.token)
            return response
        except Exception as e:
            im = '注册失败'
            return render(request, 'regiest.html', context={'im': im})


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


def checkaccount(request):
    account = request.GET.get('account')
    user = User.objects.filter(username=account)
    if user.exists():
        responseData = {
            'msg': '账号已被占用',
            'status': 0
        }
        return JsonResponse(responseData)
    else:
        responseData = {
            'msg': '账号可用',
            'status': 1,
        }
        return JsonResponse(responseData)


def addcart(request):
    token = request.COOKIES.get('token')
    if token:
        user = User.objects.get(token=token)
        id = request.GET.get('id')
        price = request.GET.get('price')
        size = request.GET.get('size')
        count = request.GET.get('count')
        colorname = request.GET.get('colorname')
        if size and colorname:
            goods = Goodsdetail.objects.filter(goodsid=id).first()
            matchcart = Cart.objects.filter(size=size, color=colorname, goods=goods, user=user).first()
            # print(id, price, size, count, colorname)
            if matchcart:
                matchcart.number += int(count)
                matchcart.save()
            else:
                cart = Cart()
                cart.user = user
                cart.goods = goods
                cart.price = price
                cart.size = size
                cart.number = count
                cart.color = colorname
                cart.save()
            return JsonResponse({'msg': '添加购物车成功', 'status': 1})
        else:
            return JsonResponse({'msg': '添加购物车失败', 'status': -1})
    else:
        return JsonResponse({'msg': '用户未登录', 'status': 0})
