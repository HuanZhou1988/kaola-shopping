document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
onload = function(){
	document.ondragstart = function(){
		return false;
	}

	var  myScroll = new IScroll('#wrapper',{
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars:true,
		click:true,
		probeType: 3
	});
  
	var refrsh = function(){
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

	

	//请求数据
	var data = new Data({url:"libs/data/index.txt",element:"#wrapper>ul"},function(){
		 var mySwiper = new Swiper ('.swiper-container', {
		    loop: true,
		    pagination: '.swiper-pagination',
		    paginationClickable :true,
		    autoplay: 1000,//可选选项，自动滑动
			speed:300,
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
	    if ( this.y <= myScroll.maxScrollY && myScroll.maxScrollY != opts.flag) {
			opts.flag = myScroll.maxScrollY;
			opts.element.refesh(opts.start + opts.index * opts.times);
		    opts.index++
	    }
	    
	});

		myScroll.on('scroll', function () {
          if(this.y < -200){
          	$("#totop").show();
          }else{
          	$("#totop").hide();
          }
      })


   $("body").on("touchstart",function(evt){
   		if ($(evt.target).is(".iconfont")) {
	   		var icon = $(evt.target);
	   		if (icon.hasClass('fa-search')) {
	   			$(".search").css('display','table').siblings().hide();
	   			icon.removeClass("fa-search").addClass("fa-close");
	   			refrsh();
	   		}else if(icon.hasClass('fa-close')){
	   			$(".search").hide().siblings().show();
	   			icon.removeClass('fa-close').addClass("fa-search");
	   			refrsh();
	   		};
	   		return false;   			
   		}else if($(evt.target).is(".iconfont") || $(evt.target).is(".fa-arrow-up")){
   			myScroll.scrollTo(0, 0);
  			$("#totop").hide();
   		};
   })
}
