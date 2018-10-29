from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=80)
    userpassword = models.CharField(max_length=40)

