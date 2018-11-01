$(function(){

	// 轮播图
	// (function() {
		//ajax创建
		// $.get("json/banner.json", function(data) {
		// 		var objArr = data.bannerimg;
		// 		for(var i = 0; i < objArr.length; i++) {
		// 			var obj = objArr[i];
		// 			//console.log(obj);
		// 			var img = $("<li><a><img src=" + obj.url + "></img></a></li>");
		// 			$(".bannerImg").append(img);
		// 		}
		// 	});
			//运动

		// var _index = 0;
		// $(".bannerImg li").stop().fadeOut();
		// $(".bannerImg li").eq(_index).stop().fadeIn();
		// $(".bannerBtn li").removeClass("bannerBtnHover").eq(_index).addClass("bannerBtnHover");
		// var timer;
		// var carouselFigure = function() {
		// 	timer = setInterval(function() {
		// 		_index++;
		// 		var maxIndex = $(".bannerImg li").length;
		// 		if(_index >= maxIndex) {
		// 			_index = 0;
		// 		}
		// 		//console.log(_index);
		// 		changeCF(_index);
		// 	}, 3000);
		// }
		// var changeCF = function(index) {
		// 	$(".bannerImg li").stop().fadeOut("slow");
		// 	$(".bannerImg li").eq(index).stop().fadeIn("slow");
		// 	$(".bannerBtn li").removeClass("bannerBtnHover").eq(index).addClass("bannerBtnHover");
		// }
		// carouselFigure();
		// $(".banner").mouseover(function() {
		// 	clearInterval(timer);
		// });
		// $(".banner").mouseout(function() {
		// 	carouselFigure();
		// });
		//小按钮事件
	// 	$(".bannerBtn li").mouseenter(function() {
	// 		_index = $(this).index()
	// 		changeCF(_index);
	// 	});
	// })
        //轮播
    var $newa = $("#banner a").first().clone();
    $("#banner").append($newa);
    var  count = 0;
    $(".bannerBtn>li").eq(count).css({"background":"blue"}).siblings().css({"background":"#808080"});
    var timer =  setInterval(function(){
        count++;
        move();
    },2000);
    $("#banner,.bannerBtn").mouseenter(function(){
        clearInterval(timer)
    });
    $("#banner").mouseleave(function(){
        timer =  setInterval(function(){
            count++;
            move();
        },2000)
    });
    function move() {
        if (count >= 4) {
            $("#banner").css("left", "0");  //不使用动画归零
            count = 1                //归零后的下一张,还是第二张图,但是整个偏移量就是第二张图
        }
        // }
        if (count === 3) {
            $(".bannerBtn>li").eq(0).css({"background":"blue"}).siblings().css({"background":"#808080"})
        }else {
            $(".bannerBtn>li").eq(count).css({"background":"blue"}).siblings().css({"background":"#808080"})
        }
        //到达最后一个

        $("#banner").animate({left: -count*1000+'px'});
    }
    $(".bannerBtn>li").mouseenter(function(){
				//高亮
				$(this).css({"background":"blue"}).siblings().css({"background":"#808080"});

				//切图
				$("#banner").css("left",($(this).index() * -1000+"px"));
				count = $(this).index()

			});

	// //新品热推
	// $.get("json/newHot.json",function(data){
	// 	creatGoods(data,0);
	// });
	// //热销单品
	// $.get("json/hotSingleProduct.json",function(data){
	// 	$(".contextBody").eq(1).append("<div class='cbbanner'><a><img src="+data.bannerUrl+"></a></div>");
	// 	creatGoods(data,1);
	// });
	// //男装
	// $.get("json/mens.json",function(data){
	// 	$(".contextBody").eq(2).append("<div class='cbbanner'><a><img src="+data.bannerUrl+"></a></div>");
	// 	creatGoods(data,2);
	// });
	// //女装
	// $.get("json/womens.json",function(data){
	// 	$(".contextBody").eq(3).append("<div class='cbbanner'><a><img src="+data.bannerUrl+"></a></div>");
	// 	creatGoods(data,3);
	// });
	// function creatGoods(data,index){
	// 	var goodsArr = data.goods;
	// 	for(var i=0;i<goodsArr.length;i++){
	// 		var goods = goodsArr[i];
	// 		var htmlcb = "<div><img src="+goods.img+"><div class='originalPrice'>";
	// 		htmlcb+="<p><a href='#'>"+goods.name+"</a></p>";
	// 		if(goods.originalPrice!=0){
	// 			htmlcb+="<p>原价￥<span>"+goods.originalPrice+"</span></p>";
	// 		}
	// 		if(index<=1){
	// 			htmlcb+="</div><div class='presentPrice' style='background: url(img/index/20160912012045_171.png) no-repeat -3px -5px;'>"+goods.presentPrice+"</div></div>";
	// 		}else{
	// 			htmlcb+="</div><div class='presentPrice' style='background: url(img/index/20160912094224_174.png) no-repeat -3px -5px;'>"+goods.presentPrice+"</div></div>";
	// 		}
	// 		var hotdiv = $("<div><img src="+goods.img+"/><div class='originalPrice'><p><a href='#'>"+goods.name+"</a></p><p>原价￥<span>"+goods.originalPrice+"</span></p></div><div class='presentPrice'>"+goods.presentPrice+"</div></div>");
	// 		$(".contextBody").eq(index).append(htmlcb);
	// 	}
	// }
    //


});