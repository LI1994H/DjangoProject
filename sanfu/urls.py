from django.conf.urls import url

from sanfu import views

urlpatterns = [
    url(r'^$',views.index,name='index'), # 主页
    url(r'^login/$',views.login, name='login'), # 登录
    url(r'^cart/$',views.cart, name='cart'), # 购物车
    url(r'^goodsList/$', views.goodsList, name='goodList'), #
    url(r'goodsMsg/(\d+[_]\d+)$', views.goodMsg, name='goodsMsg'), # 商品详情
    url(r'^regiest/$',views.regiest, name='regiest' ), # 注册
    url(r'^outlogin/$',views.outlogin,name='outlogin'), # 退出登录
    url(r'^uploadhead/$',views.uploadhead,name='uploadhead'), # 头像上传
    url(r'^checkaccount/$',views.checkaccount,name='checkaccount'),  # 账号验证
    url(r'^addcart/$',views.addcart,name='addcart'),  # 加购物车
    url(r'^changecartcount',views.changecartcount,name='changecartcount') # 获取购物车数据
]