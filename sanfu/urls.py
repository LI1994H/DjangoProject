from django.conf.urls import url

from sanfu import views

urlpatterns = [
    url(r'^$', views.index, name='index'),  # 主页
    url(r'^login/$', views.login, name='login'),  # 登录
    url(r'^cart/$', views.cart, name='cart'),  # 购物车
    url(r'^goodsList/$', views.goodsList, name='goodList'),  #
    url(r'goodsMsg/(\d+[_]\d+)/$', views.goodMsg, name='goodsMsg'),  # 商品详情
    url(r'^regiest/$', views.regiest, name='regiest'),  # 注册
    url(r'^outlogin/$', views.outlogin, name='outlogin'),  # 退出登录
    url(r'^uploadhead/$', views.uploadhead, name='uploadhead'),  # 头像上传
    url(r'^checkaccount/$', views.checkaccount, name='checkaccount'),  # 账号验证
    url(r'^addcart/$', views.addcart, name='addcart'),  # 加购物车
    url(r'^changecartcount/$', views.changecartcount, name='changecartcount'),  # 改变购物车商品数量 及单行删除
    url(r'^allselect/$', views.allselest, name='allselect'),  # 全选
    url(r'^singleselect/$', views.singleselect, name='singleselect'),  # 单选
    url(r'^deleteselect/$', views.deleteselect, name='deleteselect'),  # 删除选中
    url(r'^aggregate/$', views.aggregate, name='aggregate'),  # 总计
    url(r'^allcartnumber/$', views.allcartnumber, name='allcartnumber'),  # 获取购物车总数量
    url(r'^generateorder/$', views.generateorder, name='generateorder'),  # 生成订单
    url(r'^order/(\d+)/$', views.order, name='order')
]
