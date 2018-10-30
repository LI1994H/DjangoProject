from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=80, unique=True)
    userpassword = models.CharField(max_length=256)
    # 令牌
    token = models.CharField(max_length=256, default='')

class Banner(models.Model):
    url = models.CharField(max_length=256)