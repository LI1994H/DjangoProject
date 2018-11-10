import hashlib
import os
import random
import time
import uuid

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect, render_to_response

# Create your views here.
from myproject import settings
from sanfu.models import User, Banner, Newhot, Hotsingle, Mens, Womens, Goodsdetail, GoodList, Cart, Order, OrderGoods


# 加密
def generate_password(password):
    sha = hashlib.sha512()
    sha.update(password.encode('utf-8'))
    return sha.hexdigest()


# 主页
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
        headImg = 'img/headImg/' + user.userhead
        userdata = {
            'username': user.username,
            'userhead': headImg
        }
        data.update(userdata)
        return render(request, 'index.html', context=data)
    else:
        return render(request, 'index.html', context=data)


# 登录
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


# 购物车
def cart(request):
    token = request.COOKIES.get('token')
    if token:
        user = User.objects.get(token=token)
        headImg = 'img/headImg/' + user.userhead
        cart = Cart.objects.filter(user=user)
        data = {
            'username': user.username,
            'userhead': headImg,
            'cart': cart,
        }
        return render(request, 'cart.html', context=data)
    return render(request, 'login.html')


# 分类
def goodsList(request):
    return render(request, 'goodsList.html')


# 商品详情
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


# 注册
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


# 退出登录
def outlogin(request):
    response = redirect('sanfu:index')
    response.delete_cookie('token')
    return response


# 上传头像
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


# 账号验证
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


# 添加购物车
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


# 购物车 单个商品数量修改
def changecartcount(request):
    token = request.COOKIES.get('token')
    user = User.objects.get(token=token)
    goodsid = request.GET.get('goodsid')
    color = request.GET.get('color')
    size = request.GET.get('size')
    who = request.GET.get('who')
    goods = Goodsdetail.objects.filter(goodsid=goodsid)
    cart = Cart.objects.filter(user=user, goods=goods, color=color, size=size).first()
    if who == 'add':
        cart.number += 1
        cart.save()
        return JsonResponse({'msg': '加操作成功', 'count': cart.number, 'status': 1})
    elif who == 'sub':
        cart.number -= 1
        if cart.number <= 1:
            cart.number = 1
        cart.save()
        return JsonResponse({'msg': '减操作成功', 'count': cart.number, 'status': 2})
    elif who == 'singledelete':
        cart.delete()
        return JsonResponse({'msg': '单行删成功', 'status': 3})


# 购物车 全选 或全不选
def allselest(request):
    token = request.COOKIES.get('token')
    user = User.objects.get(token=token)
    carts = Cart.objects.filter(user=user)
    isselset = request.GET.get('isselect')
    if isselset == '1':
        for cart in carts:
            cart.isselect = 1
            cart.save()
        return JsonResponse({'msg': '全选成功', 'status': 1})
    else:
        for cart in carts:
            cart.isselect = 0
            cart.save()
        return JsonResponse({'msg': '全不选成功', 'status': 0})


# 购物车单选按钮
def singleselect(request):
    token = request.COOKIES.get('token')
    user = User.objects.get(token=token)
    goodsid = request.GET.get('goodsid')
    size = request.GET.get('size')
    color = request.GET.get('color')
    goods = Goodsdetail.objects.filter(goodsid=goodsid)
    cart = Cart.objects.filter(user=user, size=size, goods=goods, color=color).first()
    cart.isselect = not cart.isselect
    cart.save()
    responseData = {
        'msg': '单选框已修改',
        'status': cart.isselect
    }
    return JsonResponse(responseData)


# 购物车删除所有已选中
def deleteselect(request):
    token = request.COOKIES.get('token')
    user = User.objects.get(token=token)
    carts = Cart.objects.filter(user=user)
    for cart in carts:
        if cart.isselect == True:
            cart.delete()
    return JsonResponse({'msg': '删除选择成功', 'status': 1})


# 购物车内的合计
def aggregate(request):
    token = request.COOKIES.get('token')
    user = User.objects.get(token=token)
    carts = Cart.objects.filter(user=user)
    allnum = 0
    total = 0
    for cart in carts:
        if cart.isselect == True:
            allnum += int(cart.number)
            total += int(cart.number) * float(cart.price)
    return JsonResponse({'msg': '总计成功', 'status': 1, 'allnum': allnum, 'total': total})


# 页面显示购物车内的数量
def allcartnumber(request):
    token = request.COOKIES.get('token')
    if token:
        user = User.objects.get(token=token)
        carts = Cart.objects.filter(user=user)
        cartnumber = 0
        for cart in carts:
            cartnumber += int(cart.number)
        return JsonResponse({'cartnumber': cartnumber, 'status': 1})
    else:
        return JsonResponse({'cartnumber': 0, 'status': 0})


# 生成订单
def generateorder(request):
    token = request.COOKIES.get('token')
    user = User.objects.get(token=token)
    order = Order()
    order.user = user
    # 订单号 = 完整时间戳(100纳秒) + 4位数随机数
    order.identifier = str(int(time.time() * 10000000)) + str(random.randint(1000, 9999))
    order.save()
    # 购物车选择的商品
    carts = Cart.objects.filter(user=user, isselect=True)
    for cart in carts:
        ordergoods = OrderGoods()
        ordergoods.order = order
        ordergoods.goods = cart.goods
        ordergoods.price = cart.price
        ordergoods.number = cart.number
        ordergoods.size = cart.size
        ordergoods.color = cart.color
        ordergoods.save()
        cart.delete()
    ResponseData = {
        'msg': '生成订单成功',
        'status': 1,
        'identifier': order.identifier
    }
    return JsonResponse(ResponseData)
