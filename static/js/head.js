$(function(){
	//head购物车
	(function() {
		$(".hShowpingCat").mouseenter(function() {
			$("#showpingCatShow").stop().slideDown("fast");
		});
		$(".hShowpingCat").mouseleave(function() {
			$("#showpingCatShow").stop().slideUp("slow");
		});
	})();
	//首页nav
	$("#navVMain>ul>li").mouseenter(function() {
		$(this).find(".menu").css("display", "block");
		$(this).addClass("navHover").siblings().removeClass("navHover");
		$(this).children().css("color", "white").children("a").css("color", "white");
	});
	$("#navVMain>ul>li").mouseleave(function() {
		$(this).find(".menu").css("display", "none");
		$(this).removeClass("navHover");
		$(this).children().css("color", "").children("a").css("color", "#666");
	});
	//左侧滚动二维码
	$(window).scroll(function(){
		if($(this).scrollTop()>10){
			$(".scrollLeft").stop().fadeIn("slow");
		}else{
			$(".scrollLeft").stop().fadeOut("slow");
		}
	});
	$(".slcloseBtn").click(function(){
		$(".scrollLeft").css("display","none");
		$(window).unbind("scroll");
	});
	//右侧滚动qq
	$(".scrollRight li").eq(0).css("background","url(img/index/20160912094220_155.png) no-repeat -2px -3px");
	$(".scrollRight li").eq(1).mouseenter(function(){
		$(this).css({"background-color":"#333","color":"white"});
	})
	$(".scrollRight li").eq(1).mouseleave(function(){
		$(this).css({"background-color":"#eff","color":"#666"});
	})
	//回到顶部
	$(".scrollRight li").eq(1).click(function(){
		$("body").animate({"scrollTop":"0px"},1000);
	})
	//欢迎观临用户名
	var localUser = $.cookie("localUser")?$.cookie("localUser"):"";
	$(".loginbarMain>div>ul>li").eq(0).prepend("<a href='#' style='color:red;margin-right:5px'>"+localUser+"</a>");
})
