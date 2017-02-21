onload = function(){
	 var  myScroll = new IScroll('#wrapper',{
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars:true
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
	    }, 2000);
	} 

	var r = $.getUrlParam('id');
	console.log(typeof r);

	//请求数据
	var data = new Data({url:"libs/data/details.txt",element:"#wrapper>ul",id:r},function(){
		 var mySwiper = new Swiper ('.swiper-container', {
		    loop: true,
		    pagination: '.swiper-pagination',
		    paginationClickable :true,
		    autoplay: 2000,//可选选项，自动滑动
			autoplayDisableOnInteraction : false,
		  })

		 load();
	});


	//实现翻页
	var opts = {
		flag:false,
		index:1,
		start:6,//刚开始加载的数据
		times:6,//数据加载的跨度
		element:data
	}


	myScroll.on('scrollEnd', function () {
		if ($(".details").is(":visible")) {
			return false;
		};
		//如果最后一次不希望刷新
		// if (index == 4) {
		// 	return false;
		// };

		if ( this.y <= myScroll.maxScrollY && myScroll.maxScrollY != opts.flag) {
			opts.flag = myScroll.maxScrollY;
			opts.element.refesh(opts.start + opts.index * opts.times);
			$(".discuss").show().prev().hide();
		    opts.index++
	    }
	}); 

	$(document).on("touchstart",function(evt){
	 	if ($(evt.target).is("#detail")) {
	 		$(".details").show().next().hide();
	 		$(evt.target).css({"background-color":"white","color":"black"})
	 					.next().css({"background-color":"#8E488E","color":"white"});
	 		refrsh();
	 	}else if ($(evt.target).is("#content")) {
	 		$(".discuss").show().prev().hide();
	 		$(evt.target).css({"background-color":"white","color":"black"})
	 					.prev().css({"background-color":"#8E488E","color":"white"});
	 		refrsh();
	 	}else if($(evt.target).is("#cart")){
	 		//存进购物车里面
	 		var data = {};
	 		data.cart = "cart";
	 		data.src = $("#produce").attr("src");
	 		data.title = $(".content>p").text();
	 		data.price = $(".content>span").text();
	 		data.id    = $(".details").attr("id");
	 		
	 		var _array = [];
			var getItem = localStorage.getItem("cart");
			var _flag = false;

			if(getItem){
				_array = JSON.parse(getItem);
				$.each(_array, function(_index, _obj){
					if(_obj.id == $(".details").attr("id")){
						_obj.count = parseInt(_obj.count) + 1;
						_flag = true;
						return true;
					}
				})
			} 
			
			if(!_flag){
				data.count = data.count || 1;
				_array.push(data);
			}

			localStorage.setItem('cart', JSON.stringify(_array));
			$(".number").text(JSON.parse(localStorage.getItem("cart")).length);
			alert("成功加入购物车");
	 		return false;
	 	};
	 })

	//更新购物车的数量
	var getItem = localStorage.getItem("cart");
	$(".number").text(JSON.parse(getItem).length);
}