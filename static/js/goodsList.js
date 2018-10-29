$(function() {
	//给btn渐变背景色
	$(".glcmTitle button").addClass("gradient");
	//menu出现
	$(".navDiv,#navVMain").mouseenter(function() {
		$("#navVMain").css("display", "block");
	});
	$(".navDiv,#navVMain").mouseleave(function() {
		$("#navVMain").css("display", "none");
	});

	//绑定商品列表
	$.get("json/goodsList.json", function(data) {
		var count = data.goodsCount;
		var goodsArr = data.goods;

		for(var i = 0; i < goodsArr.length; i++) {
			var goods = goodsArr[i];
			var html = "<div goodsId='" + goods.id + "'><img src=" + goods.img + "><p>" + goods.name + "</p><span>￥" + goods.presentPrice + ".00</span></div>";
			$(".glcmContent").append(html);
		}
		$(".glcmContent>div").click(function(){
			var id = $(this).attr("goodsId");
			console.log(111);
			//window.location.href="http://10.2.166.37:8000/goodsMsg.html?id="+id;
			window.location.href="http://10.2.166.37:8000/goodsMsg.html?id=goods1";
		});
	});

});