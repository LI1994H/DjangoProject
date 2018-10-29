$(function() {
	
	$.idcode.setCode(); //加载生成验证码方法
	var name = $("#name");
	var pwd = $("#pwd");
	var repwd = $("#repwd");
	var allowReg = true;
	name.blur(function(){
		name.next().text("");
		if(name.val() == "") {
			name.next().text("邮箱、用户名、手机号不能为空");
			allowReg = false;
		}else{
			allowReg = true;
		}
	});
	pwd.blur(function(){
		pwd.next().text("");
		if(pwd.val() == "") {
			pwd.next().text("密码不能为空");
			allowReg = false;
		}else if(pwd.val().length<6||pwd.val().length>20){
			pwd.next().text("密码长度应在6-20个字符之间");
			allowReg = false;
		}else{
			allowReg = true;
		}
	});
	repwd.blur(function(){
		repwd.next().text("");
		if(repwd.val() != pwd.val()) {
			repwd.next().text("两次密码输入不相同");
			allowReg = false;
		}else{
			allowReg = true;
		}
	});
	$("#register").click(function() {
		if(allowReg&&name.val() != ""&&repwd.val() != ""&&pwd.val() != ""){
			var protocol = $("#protocol").prop("checked");		
			if(protocol == false) {
				alert("请同意注册协议，方可注册");
			} else {
					var userInfo = {
							"name" : name.val(),
							"pwd" : pwd.val()
						};
					console.log(userInfo);
					$.post("http://10.2.166.37:8000/user_register_post",userInfo,function(data){
						console.log(data);
						if(data.code){
							alert(data.msg);
							window.location.href = "http://10.2.166.37:8000/login.html";
						}else{
							name.next().text(data.msg);
						}
					});
				}
		}
	});

});