$(function() {
	//自定义方法
	jQuery.validator.addMethod("isMobile", function(value, element) {
		var length = value.length;
		var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
		return this.optional(element) || (length == 11 && mobile.test(value));
	}, "请正确填写您的手机号码");

	//自定义方法
	jQuery.validator.addMethod("isName", function(value, element) {

		var name = /^[a-zA-Z]+/;
		return this.optional(element) || (name.test(value));
	}, "必须以字母开头");

	$("form").validate({
		rules: {
			username: {
				required: true,
				minlength: 2,
				isName: true
			},
			password: {
				required: true,
				minlength: 5
			},
			confirm_password: {
				required: true,
				minlength: 5,
				equalTo: "#password"
			},
			phone: {
				required: true,
				minlength: 11,
				isMobile: true
			}
		},
		errorPlacement: function(error, element) {
			//只运行一次，第一次运行
			var p = $("<p />").append(error);
			p.appendTo(element.parent().parent());
			if (!element.next("span")[0]) {
				$("<span class='glyphicon glyphicon-remove form-control-feedback'></span>").insertAfter(element);
			}

		},
		success: function(label, element) {
			// Add the span element, if doesn't exists, and apply the icon classes to it.
			if (!$(element).next("span")[0]) {
				$("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
			} else {
				$(element).next("span").addClass('glyphicon-ok').removeClass('glyphicon-remove');
			}
		},
		highlight: function(element, errorClass, validClass) {
			$(element).next("span").addClass("glyphicon-remove").removeClass("glyphicon-ok");
		},
		onfocusout: function(element) {
			//失去焦点时验证
			$(element).valid();
		}
	})



	$("button").on("touchstart", function(evt) {
		if ($("form").valid()) {
			localStorage.setItem("userName", $("#username").val());
			localStorage.setItem("passWord", $("#password").val());
			console.log(localStorage.getItem("userName"));
			console.log(localStorage.getItem("passWord"));
			//显示遮罩
			if ($('.mask')[0]) {
				$('.mask').show();
			} else {
				$('<div class="mask"><i class="fa fa-spinner fa-spin"></i></div>').appendTo('body').show();
			}

			setTimeout(function() {
				$('.mask').hide();
				alert("注册成功");
			}, 2000);

		}
		evt.preventDefault();
	});

})