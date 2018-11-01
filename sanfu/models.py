from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=80, unique=True)
    userpassword = models.CharField(max_length=256)
    userhead = models.CharField(max_length=256,default='defaultHead.jpg')
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


