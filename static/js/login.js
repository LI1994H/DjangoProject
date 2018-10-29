$(function() {
	//TAB切换
	$(".logintab li").click(function() {
			$(this).removeClass().addClass("loginliact").siblings().removeClass("loginliact");
			if($(this).index() == 0) {
				$(".qrLogin").css("display", "block");
				$(".formLogin").css("display", "none");
			} else {
				$(".qrLogin").css("display", "none");
				$(".formLogin").css("display", "block");
			}
		});
	//获取用户数据
	var localUser = $.cookie("localUser");
	$("#userName").val(localUser);
	$("#loginBtn").click(function() {
		var name = $("#userName").val();
		var pwd = $("#passWord").val();
		var remenber = $("#remenberMsg").prop("checked");
		var LoginInfo = {
				"loginName":name,
				"loginPwd":pwd
		};
		$.post("http://10.2.166.37:8000/user_login_post",LoginInfo,function(data){
			console.log(data);
			if(data.code){
				$("#loginerror").text("");
				if(remenber){
					$.cookie("localUser",name,{expires:7,path:"/"});
				}	
				alert(data.msg);
				window.location.href = "http://10.2.166.37:8000/index.html";
				
			}else{
				$("#loginerror").text("").text(data.msg);
			};
		});
	});

});