$(function(){
	if (localStorage.getItem("userName")) {
		console.log(localStorage.getItem("userName"));
	};
	if (localStorage.getItem("passWord")) {
		console.log(localStorage.getItem("passWord"));
	};

	$('button').on("touchstart",function(){
		if ($("#username").val() == localStorage.getItem("userName") && $("#password").val() == localStorage.getItem("passWord")) {
			alert("登录成功,直接登录首页")
			window.location.href = "user.html";
			localStorage.setItem("user",$("#username").val())
		}else{
			alert("密码或账号错误");
		};
	})
})