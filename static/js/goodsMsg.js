$(function() {
	var id = location.search.substring(1);
	console.log(id);
	$.post("http://10.2.166.37:8000/goodsMsg_get",id,function(data){
		console.log(data);
	});
	//放大镜
	var wy = $("#minImg").offset().top;
	var wx = $("#minImg").offset().left + $("#minImg").width() + 20;
	$("#maxArea").css({
		"left": wx,
		"top": wy
	});
	$("#minImg").mouseenter(function() {
		$("#minArea").stop().fadeIn("fast");
		$("#maxArea").stop().fadeIn("fast");
		$("#minImg").mousemove(function(e) {
			var scale = $("#maxImg").width() / $("#minImg").width();
			var x = e.pageX - $("#minImg").offset().left - $("#minArea").width() / 2;
			var y = e.pageY - $("#minImg").offset().top - $("#minArea").height() / 2;
			//console.log(x+" "+y);
			var minx = 0;
			var maxx = $("#minImg").width() - $("#minArea").width();
			var miny = 0;
			var maxy = $("#minImg").height() - $("#minArea").height();
			//console.log(minx+" "+maxx);
			if(x < minx) {
				x = minx;
			} else if(x > maxx) {
				x = maxx;
			}
			if(y < miny) {
				y = miny;
			} else if(y > maxy) {
				y = maxy;
			}
			$("#minArea").css({
				"left": x,
				"top": y
			});
			$("#maxImg").css({
				"left": -scale * x,
				"top": -scale * y
			});
		});
		$("#minImg").mouseleave(function() {
			$("#minImg").unbind("mousemove");
			$("#maxArea").stop().fadeOut("fast");
			$("#minArea").stop().fadeOut("fast");
		});
	});
	//改变图片
	$("#cfsmall ul li").mouseenter(function() {
		var index = $(this).index() + 1;
		$("#minImg").css("background-image", "url(img/goods/" + index + ".bmp)");
		$("#maxImg").css("background-image", "url(img/goods/" + index + ".bmp)");
	});
	var msgcolor = "";
	var msgsize = "";
	//选择颜色
	$(".gmcolor li").click(function() {
			$(this).addClass("gmcolorchecked").siblings().removeClass("gmcolorchecked");
			msgcolor = $(this).attr("colorstyle");
			$(".gmmsg label").eq(1).text(msgcolor + " " + msgsize);
		})
		//选择尺寸
	$(".gmsize span").click(function() {
			$(this).addClass("gmsizechecked").siblings().removeClass("gmsizechecked");
			msgsize = $(this).text();
			$(".gmmsg label").eq(1).text(msgcolor + " " + msgsize);
		})
		//选择数量
	$("#sub").click(function() {
		var num = $(".gmcount input").val();
		if(num <= 1) {
			num = 1
		} else {
			num--;
		}
		$(".gmcount input").val(num);
	})
	$("#add").click(function() {
			var num = $(".gmcount input").val();
			num++;
			$(".gmcount input").val(num);
		})
		//添加货物
	$("#addcat").click(function() {
			if(addcart()) {
				alert("添加购物车成功");
				window.location.reload();
			}
		})
		//跳转
	$("#payMoney").click(function() {
			if(addcart()){
				window.location.href = "http://10.2.166.37:8000/cart.html";
			};
			
		})
		//加入购物车方法
	var addcart = function() {
		var name = $(".gmname").children("p").text();
		var id = $(".gmid").children("label").text();
		var price = $(".gmprice").find("span").text();
		var colorname = $(".gmcolor li[class='gmcolorchecked']").attr("colorstyle");
		var colorimg = $(".gmcolor li[class='gmcolorchecked']").attr("style");
		var size = $(".gmsize span[class='gmsizechecked']").text();
		var count = $(".gmcount").find("input").val();
		if(colorname == undefined) {
			$(".gmmsg span").text("").text("请选择颜色");
			return 0;
		}
		if(size == "") {
			$(".gmmsg span").text("").text("请选择尺寸");
			return 0;
		}
		$(".gmmsg span").text("");
		var cartArr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
		var i;
		for(i=0;i<cartArr.length;i++){
			if(cartArr[i].id==id&&cartArr[i].colorname==colorname&&cartArr[i].size==size){
				cartArr[i].count=parseInt(cartArr[i].count)+parseInt(count);
				$.cookie("cart", JSON.stringify(cartArr), {
				expries: 7,
				path: "/"
				});
				return 1;
			}
		}
		if(i>=cartArr.length){
			var goodsMsg = {
			"id": id,
			"name": name,
			"price": price,
			"colorname": colorname,
			"colorimg": colorimg,
			"size": size,
			"count": count
		}
		cartArr.push(goodsMsg);
		$.cookie("cart", JSON.stringify(cartArr), {
			expries: 7,
			path: "/"
		});
		console.log(cartArr);
		return 1;
		}
		
	}

})
