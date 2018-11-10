// $(function () {
//     //获取购物车数据
//     var cartArr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
//     console.log(cartArr);
//     if (cartArr.length == 0) {
//         var html = "<tr><td colspan='7'>购物车中没有商品记录！</td></tr>";
//         $("#mycart").append(html);
//
//     } else {
//         //console.log(cartArr);
//         var allnum = 0;
//         var total = 0;
//         for (var i = 0; i < cartArr.length; i++) {
//             var goods = cartArr[i];
//             allnum += parseInt(goods.count);
//             var pricestr = goods.price;
//             pricestr = pricestr.substring(1);
//             var count = goods.count;
//             var html = "<tr><td><input type='checkbox'/></td>";
//             html += "<td><img style='" + goods.colorimg + "'/></td>";
//             html += "<td><span>" + goods.name + "</span><p>" + goods.colorname + "," + goods.size + "</p></td>";
//             html += "<td><span>" + goods.price + "元</span></td>";
//             html += "<td><button class='sub'>-</button><input type='text' value='" + goods.count + "'/><span></span><button class='add'>+</button></td>";
//             html += "<td><span>￥" + (count * pricestr) + "元</span></td>";
//             html += "<td><a class='delethis'>删除商品</a></td></tr>";
//             $("#mycart").find().remove().end().append(html);
//             total += count * pricestr;
//         }
//         //全部数量和总价
//         $(".cartDele b").text(allnum);
//         $(".cartToal b").text(total);
//         //全选按钮事件
//         $("#checkall").click(function () {
//             if ($("#checkall").prop("checked") == true) {
//                 $("#mycart").find("input[type='checkbox']").attr("checked", true);
//             }
//         })
//         $("#mycart").find("input[type='checkbox']").click(function () {
//             if ($(this).prop("checked") == false) {
//                 $("#checkall").attr("checked", false);
//             }
//         });
//         //删除某行商品
//         $(".delethis").click(function () {
//             $(this).parents("tr").remove();
//             var i = $(this).index();
//             bindgoods(i);
//         });
//         //删除选中商品
//         $("#deleteGoods").click(function () {
//             for (var k = 0; k <= cartArr.length; k++) {
//                 if ($("#mycart tr td").parent("tr").eq(k).find("input[type='checkbox']").prop("checked") == true) {
//                     $("#mycart tr td").parent("tr").eq(k).remove();
//                     bindgoods(k);
//                     k--;
//                 }
//             }
//
//         });
//         //重新绑定数据
//         var bindgoods = function (k) {
//             cartArr.splice(k, 1);
//             $.cookie("cart", JSON.stringify(cartArr), {
//                 expries: 7,
//                 path: "/"
//             });
//             window.location.reload();
//         }
//         //加减商品
//         $(".sub").click(function () {
//             var index = $(this).parents("tr").index();
//             index--;
//             console.log(index);
//             if ($(this).next().val() <= 1) {
//                 $(this).next().val(1);
//             } else {
//                 $(this).siblings("input").val($(this).siblings("input").val() * 1 - 1);
//             }
//             var cartArr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
//             cartArr[index].count = $(this).siblings("input").val();
//             $.cookie("cart", JSON.stringify(cartArr), {
//                 expries: 7,
//                 path: "/"
//             });
//             window.location.reload();
//         });
//         $(".add").click(function () {
//             var index = $(this).parents("tr").index();
//             index--;
//             console.log(index);
//             $(this).siblings("input").val($(this).siblings("input").val() * 1 + 1);
//             var cartArr = $.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
//             cartArr[index].count = $(this).siblings("input").val();
//             $.cookie("cart", JSON.stringify(cartArr), {
//                 expries: 7,
//                 path: "/"
//             });
//             window.location.reload();
//         });
//     }
//     //跳转
//     $("#turnBackList").click(function () {
//         window.location.href = "http://10.2.166.37:8020/sanfu/goodsList.html";
//     })
//
// });
$(function () {
	// 默认全选
	$.get('/allselect/',{'isselect':1},function () {
		$("#mycart").find(".single").prop("checked", true);
	});

	// 小计
	$('.goodsinfo').each(function () {
		var price = $(this).find('.price').text();
		var count = $(this).find('.count').val();
		$(this).find('.total').html((price*count).toFixed(2))
    });
	// 增加数量
	$('.add').click(function () {
		var $that = $(this);
		var size = $(this).parents('.goodsinfo').find('.size').text();
		var color = $(this).parents('.goodsinfo').find('.color').text();  //商品尺寸 颜色 不一样是不同对象 所以需要传大小和颜色到后台判断
		var goodsid = $(this).parents('.goodsinfo').attr('goodsid');
		$.get(/changecartcount/,{'goodsid':goodsid,'size':size,'color':color,'who':'add'},function (repsonse) {
			if (repsonse.status==1){
				var price = $that.parents('.goodsinfo').find('.price').text();
				$that.parents('.goodsinfo').find('.count').val(repsonse.count);
				$that.parents('.goodsinfo').find('.total').html((price*repsonse.count).toFixed(2));
				aggregate();
			}
        })
    });
	//减少数量
	$('.sub').click(function () {
		var $that = $(this);
		var size = $(this).parents('.goodsinfo').find('.size').text();
		var color = $(this).parents('.goodsinfo').find('.color').text();  //商品尺寸 颜色 不一样是不同对象 所以需要传大小和颜色到后台判断
		var goodsid = $(this).parents('.goodsinfo').attr('goodsid');
		$.get(/changecartcount/,{'goodsid':goodsid,'size':size,'color':color,'who':'sub'},function (repsonse) {
			if (repsonse.status==2){
				var price = $that.parents('.goodsinfo').find('.price').text();
				$that.parents('.goodsinfo').find('.count').val(repsonse.count);
				$that.parents('.goodsinfo').find('.total').html((price*repsonse.count).toFixed(2));
                aggregate();
			}
        })
    });


	//全选按钮事件
	$("#checkall").on('click',function () {
		if ($("#checkall").prop("checked") == true){
			$.get('/allselect/',{'isselect':1},function (response) {
				if (response.status==1){
					$("#mycart").find(".single").prop("checked", true);
					aggregate();
				}
            });
		}else{
			$.get('/allselect/',{'isselect':0},function (response) {
				if (response.status==0){
					$("#mycart").find(".single").prop("checked", false);
					aggregate();
				}
            });
		}
	});
//单选按钮事件
	$("#mycart").find(".single").on('click',function () {
		var $that = $(this);
		var size = $(this).parents('.goodsinfo').find('.size').text();
		var color = $(this).parents('.goodsinfo').find('.color').text();  //商品尺寸 颜色 不一样是不同对象 所以需要传大小和颜色到后台判断
		var goodsid = $(this).parents('.goodsinfo').attr('goodsid');
		$.get('/singleselect/',{'size':size,'color':color,'goodsid':goodsid},function (response) {
			if(response.status==false){
				$that.prop('checked',false);
				$("#checkall").prop("checked", false);
                aggregate();

			}else {
				$that.prop('checked',true);
                aggregate();
			}
        });
	});


		//删除某行商品
	$(".delethis").click(function () {
		var $that = $(this);
		var size = $(this).parents('.goodsinfo').find('.size').text();
		var color = $(this).parents('.goodsinfo').find('.color').text();  //商品尺寸 颜色 不一样是不同对象 所以需要传大小和颜色到后台判断
		var goodsid = $(this).parents('.goodsinfo').attr('goodsid');
		$.get('/changecartcount/',{'size':size,'color':color,'goodsid':goodsid,'who':'singledelete'},function (response) {
			if (response.status==3){
				$that.parents("tr").remove();
                aggregate();
			}
        });
	});

	//删除选中商品
	$("#deleteGoods").click(function () {
		$.get('/deleteselect/',function (response) {
			if (response.status==1){
				$(".single").each(function () {
					if($(this).prop("checked")==true){
						$(this).parents('tr').remove();
                        aggregate();
					}
        		})
			}
        });

	});


    aggregate();
	//总计
	function aggregate() {
		$.get('/aggregate/',function (response) {
			$(".cartDele b").text(response.allnum);
			$(".cartToal b").text(response.total);

        })
    }
	
	//继续购物
    $('#turnBackList').click(function () {
        window.open('/',target='_self')
    })

	// if (cartArr.length == 0) {
//         var html = "<tr><td colspan='7'>购物车中没有商品记录！</td></tr>";
//         $("#mycart").append(html);
//
//     } else {
//         //console.log(cartArr);
//         var allnum = 0;
//         var total = 0;
//         for (var i = 0; i < cartArr.length; i++) {
//             var goods = cartArr[i];
//             allnum += parseInt(goods.count);
//             var pricestr = goods.price;
//             pricestr = pricestr.substring(1);
//             var count = goods.count;
//             var html = "<tr><td><input type='checkbox'/></td>";
//             html += "<td><img style='" + goods.colorimg + "'/></td>";
//             html += "<td><span>" + goods.name + "</span><p>" + goods.colorname + "," + goods.size + "</p></td>";
//             html += "<td><span>" + goods.price + "元</span></td>";
//             html += "<td><button class='sub'>-</button><input type='text' value='" + goods.count + "'/><span></span><button class='add'>+</button></td>";
//             html += "<td><span>￥" + (count * pricestr) + "元</span></td>";
//             html += "<td><a class='delethis'>删除商品</a></td></tr>";
//             $("#mycart").find().remove().end().append(html);
//             total += count * pricestr;
//         }
//         //全部数量和总价
//         $(".cartDele b").text(allnum);
//         $(".cartToal b").text(total);
});