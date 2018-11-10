from django.db import models


# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=80, unique=True)
    userpassword = models.CharField(max_length=256)
    userhead = models.CharField(max_length=256, default='defaultHead.jpg')
    # 令牌
    token = models.CharField(max_length=256, default='')


class Banner(models.Model):
    url = models.CharField(max_length=256)


class Goods(models.Model):
    goodsid = models.CharField(max_length=100)
    img = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    originalPrice = models.CharField(max_length=100)
    presentPrice = models.CharField(max_length=100)

    class Meta:
        abstract = True


class GoodList(Goods):
    class Meta:
        db_table = 'goodslist'


class Hotsingle(Goods):
    class Meta:
        db_table = 'hotsingle'


class Newhot(Goods):
    class Meta:
        db_table = 'newhot'


class Mens(Goods):
    class Meta:
        db_table = 'mens'


class Womens(Goods):
    class Meta:
        db_table = 'womens'


class Goodsdetail(models.Model):
    goodsid = models.CharField(max_length=30)
    name = models.CharField(max_length=200)
    manImg = models.CharField(max_length=50)
    detailImg1 = models.CharField(max_length=50)
    detailImg2 = models.CharField(max_length=50)
    detailImg3 = models.CharField(max_length=50)
    detailImg4 = models.CharField(max_length=50)
    detailImg5 = models.CharField(max_length=50)
    detailImg6 = models.CharField(max_length=50)
    detailImg7 = models.CharField(max_length=50)

    colorImg1 = models.CharField(max_length=50)
    colorImg2 = models.CharField(max_length=50)
    colorImg3 = models.CharField(max_length=50)
    colorImg4 = models.CharField(max_length=50)

    class Meta:
        db_table = 'goodsdatail'


# 购物车
class Cart(models.Model):
    # 用户
    user = models.ForeignKey(User)
    # 商品
    goods = models.ForeignKey(Goodsdetail)
    # 商品数量(选择)
    number = models.IntegerField()
    # 颜色
    color = models.CharField(max_length=20)
    # 大小
    size = models.CharField(max_length=10)
    # 是否选中
    isselect = models.BooleanField(default=True)
    price = models.IntegerField()

    class Meta:
        db_table = 'sanfu_cart'


class Order(models.Model):
    # 用户
    user = models.ForeignKey(User)
    # 订单号
    identifier = models.CharField(max_length=256)
    # 状态
    '''
    -1 过期
    1 未付款
    2 付款未发货
    3 已发货
    4 已签收 未评价
    5 已评价
    6 退款
    '''
    status = models.IntegerField(default=1)
    createtime = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'sanfu_order'


class OrderGoods(models.Model):
    # 订单
    order = models.ForeignKey(Order)
    # 商品
    goods = models.ForeignKey(Goodsdetail)
    price = models.CharField(max_length=20)
    # 数量
    number = models.IntegerField()
    # 大小
    size = models.CharField(max_length=10)
    # 颜色
    color = models.CharField(max_length=30)

    class Meta:
        db_table = 'sanfu_ordergoods'
