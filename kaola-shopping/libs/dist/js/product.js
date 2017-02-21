document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
onload = function(){
	document.ondragstart = function(){
		return false;
	}

	var r = $.getUrlParam('id');

	//商品加载e
	$(document).on("touchstart",function(evt){
		// console.log(evt.target);
		if($(evt.target).is(".goods li")){
			$(evt.target).css({"background-color":"#f2f2f2"})
						 .siblings().css({"background-color":"#eaeaea"});
			$(".product li").eq($(evt.target).index()).show().siblings().hide();
		}else if ($(evt.target).is(".icont") || $(evt.target).is(".items")) {
			var $target = null;
			if ($(evt.target).is(".icont")) {
				$target = $(evt.target).closest(".items");
			}else{
				$target = $(evt.target);
			}
			
			//判断是否为ABC
			if ($target.is(".abc")) {
				$("#wrapper").show().prev().hide();
			}else{
				$(".classify>div").eq($target.index()).show().siblings().hide();
				$("#wrapper").hide();
				$(".classify").show();
			};
			
			if ($target.find("i").hasClass('fa-caret-down')) {
				$target.find("i").addClass('fa-caret-up').removeClass('fa-caret-down').closest('.items').siblings().find('i').addClass('fa-caret-down').removeClass('fa-caret-up');
				$target.css({"color":"pink"}).siblings().css({"color":"black"});
			}else{
				$target.find("i").addClass('fa-caret-down').removeClass('fa-caret-up');
				$target.css({"color":"black"})
			};
		};
	})


	

	var  myScroll = new IScroll('#wrapper',{
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars:true,
		click:true
	});

	var refrsh = function(){
		console.log('刷新');
		myScroll.refresh();

	} 

	var load = function(){
		//显示遮罩函数
		shade();			
        setTimeout(function () {
        	$('.mask').hide();
	        refrsh();
	        console.log("jjk1")
	    }, 2000);
	}

	

	//请求数据
	var data = new Data({url:"libs/data/products.txt",element:".menu"},load);


	//实现翻页
	var opts = {
		flag:false,
		index:1,
		start:6,//刚开始加载的数据
		times:6,//数据加载的跨度
		element:data
	}

	myScroll.on('scrollEnd', function () {
	    if ( this.y <= myScroll.maxScrollY && myScroll.maxScrollY != opts.flag) {
			opts.flag = myScroll.maxScrollY;
			opts.element.refesh(opts.start + opts.index * opts.times);
		    opts.index++
	    }
	});

}