$(function() {
	//获取购物车数据
	var cartArr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
	if(cartArr.length == 0) {
		var html = "<div><p>您还没有购买合适的商品呢！快去购买吧！</p></div>";
		$("#showpingCatShow").append(html);
		var html = '<div class="hSettlement"><a href="#"><img src="img/index/top_flow.png" /></a></div>';
		$("#showpingCatShow").append(html);
	} else {
		$("#cartnum").text(cartArr.length);
		for(var i = 0; i < cartArr.length; i++) {
			var goods = cartArr[i];
			var html = "<div style='border-bottom:1px dashed #ddd'><img style='" + goods.colorimg + "'/><span>" + goods.name + "<p><b>" + goods.price + "</b><a>删除</a></p></span>";
			$("#showpingCatShow").append(html);
		}
		var html = '<div class="hSettlement"><a href="#"><img src="img/index/top_flow.png" /></a></div>';
		$("#showpingCatShow").append(html);
		//删除选中商品
		$("#showpingCatShow div span p a").click(function() {
				$(this).parentsUntil("div").parent().remove();
				var i = $(this).index()-1;
				bindgoods(i);
				
		})
		//重新绑定数据
		var bindgoods = function(k) {
			cartArr.splice(k, 1);
			$.cookie("cart", JSON.stringify(cartArr), {
				expries: 7,
				path: "/"
			});
			console.log(k);
			window.location.reload();
		}
		
}
		//点击跳转
		$("#showpingCatShow>div>a>img").click(function(){
			location.href="http://10.2.166.37:8000/cart.html"
		})
		
		$("#cartnum").click(function(){
			location.href="http://10.2.166.37:8000/cart.html"
		})
})