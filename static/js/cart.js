$(function() {
	//获取购物车数据
	var cartArr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
	console.log(cartArr);
	if(cartArr.length == 0) {
		var html = "<tr><td colspan='7'>购物车中没有商品记录！</td></tr>";
		$("#mycart").append(html);

	} else {
		//console.log(cartArr);
		var allnum = 0;
		var total = 0;
		for(var i = 0; i < cartArr.length; i++) {
			var goods = cartArr[i];
			allnum += parseInt(goods.count);
			var pricestr = goods.price;
			pricestr = pricestr.substring(1);
			var count = goods.count;
			var html = "<tr><td><input type='checkbox'/></td>";
			html += "<td><img style='" + goods.colorimg + "'/></td>";
			html += "<td><span>" + goods.name + "</span><p>" + goods.colorname + "," + goods.size + "</p></td>";
			html += "<td><span>" + goods.price + "元</span></td>";
			html += "<td><button class='sub'>-</button><input type='text' value='" + goods.count + "'/><span></span><button class='add'>+</button></td>";
			html += "<td><span>￥" + (count * pricestr) + "元</span></td>";
			html += "<td><a class='delethis'>删除商品</a></td></tr>";
			$("#mycart").find().remove().end().append(html);
			total += count * pricestr;
		}
		//全部数量和总价
		$(".cartDele b").text(allnum);
		$(".cartToal b").text(total);
		//全选按钮事件
		$("#checkall").click(function() {
			if($("#checkall").prop("checked") == true) {
				$("#mycart").find("input[type='checkbox']").attr("checked", true);
			}
		})
		$("#mycart").find("input[type='checkbox']").click(function() {
				if($(this).prop("checked") == false) {
					$("#checkall").attr("checked", false);
				}
			})
			//删除某行商品
		$(".delethis").click(function() {
				$(this).parents("tr").remove();
				var i = $(this).index();
				bindgoods(i);
			})
			//删除选中商品
		$("#deleteGoods").click(function() {
				for(var k = 0; k <= cartArr.length; k++) {
					if($("#mycart tr td").parent("tr").eq(k).find("input[type='checkbox']").prop("checked") == true) {
						$("#mycart tr td").parent("tr").eq(k).remove();
						bindgoods(k);
						k--;
					}
				}

			})
			//重新绑定数据
		var bindgoods = function(k) {
			cartArr.splice(k, 1);
			$.cookie("cart", JSON.stringify(cartArr), {
				expries: 7,
				path: "/"
			});
			window.location.reload();
		}
		//加减商品
		$(".sub").click(function(){
			var index = $(this).parents("tr").index();
			index--;
			console.log(index);
			if($(this).next().val()<=1){
				$(this).next().val(1);
			}else{
				$(this).siblings("input").val($(this).siblings("input").val()*1-1);
			}
			var cartArr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
				cartArr[index].count=$(this).siblings("input").val();
				$.cookie("cart", JSON.stringify(cartArr), {
				expries: 7,
				path: "/"
				});
			window.location.reload();
		});
		$(".add").click(function(){
			var index = $(this).parents("tr").index();
			index--;
			console.log(index);
			$(this).siblings("input").val($(this).siblings("input").val()*1+1);
			var cartArr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];		
				cartArr[index].count=$(this).siblings("input").val();
				$.cookie("cart", JSON.stringify(cartArr), {
				expries: 7,
				path: "/"
				});
			window.location.reload();
		});
	}
	//跳转
	$("#turnBackList").click(function(){
		window.location.href ="http://10.2.166.37:8020/sanfu/goodsList.html";
	})

})