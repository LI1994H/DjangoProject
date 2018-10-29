from django.conf.urls import url

from sanfu import views

urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^login/$',views.login, name='login'),
    url(r'^cart/$',views.cart, name='cart'),
    url(r'^goodsList/$', views.goodsList, name='goodList'),
    url(r'goodsMsg/', views.goodMsg, name='goodsMsg'),
    url(r'^regiest/$',views.regiest, name='regiest' ),
    url(r'^outlogin/$',views.outlogin,name='outlogin')
]