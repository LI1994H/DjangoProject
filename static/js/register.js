$(function() {
	
	$.idcode.setCode(); //加载生成验证码方法
	var name = $("#name");
	var pwd = $("#pwd");
	var repwd = $("#repwd");
	var nameAllow = false;
	var pwdAllow = false;
	var repwdAllow =false;
	name.blur(function(){
		name.next().text("");
		if(name.val() === "") {
			name.next().text("邮箱、用户名、手机号不能为空");
			nameAllow = false;
		}else{
			nameAllow = true;
		}
	});
	pwd.blur(function(){
		pwd.next().text("");
		if(pwd.val() === "") {
			pwd.next().text("密码不能为空");
			pwdAllow = false;
		}else if(pwd.val().length<6||pwd.val().length>20){
			pwd.next().text("密码长度应在6-20个字符之间");
			pwdAllow = false;
		}else{
			pwdAllow = true;
		}
	});
	repwd.blur(function(){
		repwd.next().text("");
		if(repwd.val() !== pwd.val()) {
			repwd.next().text("两次密码输入不相同");
			repwdAllow = false;
		}else{
			repwdAllow = true;
		}
	});
	$('#register').click(function () {
		var protocol = $("#protocol").prop("checked");
		if (nameAllow && pwdAllow && repwdAllow && protocol === true){
			$('form').attr('onsubmit','return true');
		}
    });

});

