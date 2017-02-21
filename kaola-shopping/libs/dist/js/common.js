//1.构造函数方式处理数据
var Data = function(opts,_callback){
	var defaul = {
		data:null,
		url:"",
		element:"",
		user:"1",
		id:"2",
		page:6
	}
	var data = $.extend(true,defaul,opts)
	var self = this;

	var init = function(callback){
		if (!data.data && !data.url) {
			return false;
		};

		if (data.data) {
			console.log("data");
		}else if (!data.data && data.url) {
			//ajax请求
			$.get(data.url+'?_='+Math.random(),function(_response){
				data.data = typeof _response == "string" ? eval("("+_response+")"):_response;
				if (callback && typeof callback == "function") {
					callback();
				};
			})
		};
	}

	var generHtml = function(_page){
		//一次展示的页数
		var page = _page || data.page;
		 var html = '';
		 var Data = data.data;


		$.each(Data,function(_index,_value){
			//单页面的函数加载;
			if (_index < page) {
				if(_value.user){
					//个人中心的
					if (_value.id == data.user) {
						html += '<li> <div><img src='+_value.src+' ></div> <div> <p id="userName">'+_value.name+'</p> <p><img src='+_value.src+' class="img-responsive" ><span>'+_value.rank+'</span></p> </div> <div> <i class="fa fa-angle-right"></i> </div> </li> <li class="clearfix"> <div class="col-xs-4"> <a href="#" >'+_value.cash+'</a> <p>我的金额</p> </div> <div class="col-xs-4"> <a href="#" title="">'+_value.avail+'</a> <p>可用金额</p> </div> <div class="col-xs-4 last"> <a href="#" title="">'+_value.daibi+'</a> <p>代币</p> </div> </li>';
						html += '<li> <a href="#"> <div> <span class="fa-stack fa-lg"> <i class="fa fa-circle fa-stack-2x"></i> <i class="fa fa-user fa-stack-1x fa-inverse"></i> </span> 一级会员 </div> <div> <span>'+_value.one+'</span> <i class="fa fa-angle-right fa-lg"></i> </div> </a> <a href="#"> <div> <span class="fa-stack fa-lg"> <i class="fa fa-circle fa-stack-2x"></i> <i class="fa fa-user fa-stack-1x fa-inverse"></i> </span> 二级会员 </div> <div> <span>'+_value.two+'</span> <i class="fa fa-angle-right fa-lg"></i> </div> </a> <a href="#"> <div> <span class="fa-stack fa-lg"> <i class="fa fa-circle fa-stack-2x"></i> <i class="fa fa-user fa-stack-1x fa-inverse"></i> </span> 三级会员 </div> <div> <span>'+_value.three+'</span> <i class="fa fa-angle-right fa-lg"></i> </div> </a> </li>';
						html += '<li> <a href="#"> <div> <span class="fa-stack fa-lg"> <i class="fa fa-circle fa-stack-2x"></i> <i class="fa fa-user fa-stack-1x fa-inverse"></i> </span> 我的订单 </div> <div> <i class="fa fa-angle-right fa-lg"></i> </div> </a> <a href="#"> <div> <span class="fa-stack fa-lg"> <i class="fa fa-circle fa-stack-2x"></i> <i class="fa fa-user fa-stack-1x fa-inverse"></i> </span> 升级为商家 </div> <div> <i class="fa fa-angle-right fa-lg"></i> </div> </a> <a href="#"> <div> <span class="fa-stack fa-lg"> <i class="fa fa-circle fa-stack-2x"></i> <i class="fa fa-user fa-stack-1x fa-inverse"></i> </span> 完善资料 </div> <div> <i class="fa fa-angle-right fa-lg"></i> </div> </a> </li>';
					};
				}else if(_value.cart){
					//购物车的
					html += '<li id ='+_value.id+' class="good">';
					html +='<div> <i class="fa fa-circle-o icon checked" check = "false"></i> </div> <div> <img src='+_value.src+' class="img-responsive produce"  > </div> <div> <p class="title">'+_value.title+'</p> <div class="total clearfix"> <div class="price">￥<span class="sum">'+_value.price+'</span></div> <div class="trash"> <i class="fa fa-trash-o"></i> </div> <div class="number clearfix"> <div><i class="fa fa-plus"></i></div> <div class="num">'+_value.count+'</div> <div><i class="fa fa-minus"></i></div> </div> </div> </div>';
					html +='</li>';
				}else if(_value.flag){
					//列表的
					html += ' <a href="detail.html?id='+_value.id+'" class='+_value.class+' id='+_value.id+'><img src='+_value.src+' class="img-responsive"><p>'+_value.content+'</p> <span>'+_value.price+'</span></a>';
				}
			};


			//首页的
			if (_index == "lunbo") {
				html = '<li class="lunbo"> <div class="swiper-container"> <div class="swiper-wrapper">';
				$.each(_value,function(index,value){
					html += '<div class="swiper-slide"><a href="product.html"><img src=' +value.src+ ' class="img-responsive" /></a></div>'
				})
				html += '</div> <div class="swiper-pagination"></div> </div> </li>';
			}else if(_index == "list"){
				html += '<li> <div class="menu">';
				$.each(_value,function(index,_value){
					if (index<page) {
						if(_value.flag){
							html += ' <a href="product.html?id='+_value.id+'" class='+_value.class+' id='+_value.id+'><img src='+_value.src+' class="img-responsive"><p>'+_value.content+'</p> <span>'+_value.price+'</span></a>';
						}else{
							html += ' <div class='+_value.class+' id='+_value.id+'><a href="product.html?id='+_value.id+'"><img src='+_value.src+' class="img-responsive"></a></div>';
						}
					};
				})
				html += '</div> </li>';
			}


			//详情页面的
			if(_index == "detail"){
				$.each(_value,function(key,val){
					//加载数据
					if(val.id == data.id){
						html += '<li class="details" id='+val.id+'> <div class="swiper-container"> <div class="swiper-wrapper">';
						html += ' <div class="swiper-slide"><img src='+val.src+' class="img-responsive" id="produce" /></div> <div class="swiper-slide"><img src='+val.src+'  class="img-responsive"/></div> <div class="swiper-slide"><img src='+val.src+' class="img-responsive" /></div> </div>';
						html += ' <div class="swiper-pagination"></div> </div> <div class="content"> <p>'+val.content+'</p> ￥<span>'+val.price+'</span> </div> <div class="introude"> <ul> <li><span>品牌名称：</span>LETDIOSTO</li> <li><span>商品名称：</span>女款黑白色条纹上衣阔腿裤套装</li> <li><span>材质：</span>上衣:粘纤77% 聚酯纤维18.5% 氨纶4.5% 裤子:聚酯纤维100% (装饰物除外)</li> <li><span>洗涤说明：</span>最高洗涤温度40℃ 不可漂白 平摊晾干 熨斗底板最高温度110℃ 常规干洗（深色或者深色与浅色相拼的衣服洗涤时请注意：不宜用碱性过强的洗涤液；不宜浸泡时间过久）</li> </ul> </div> <div> <img src="libs/dist/image/detail/60.jpg" class="img-responsive" > </div> </li>'
					}
					
				})
			}else if(_index == 'text'){
				//加载评论
				html += '<li class="discuss"> <ul>';
				$.each(_value,function(_ide,_val){
					if(_ide<page){
						html += '<li> <div> <img src='+_val.src+' > <span>'+_val.name+'</span> <span>'+_val.time+'</span> </div><p class="red">';
						for(var i=0;i<parseInt(_val.red);i++){
							html += '<i class="fa fa-star"></i>';
						}
						html += '</p><p>'+_val.cont+'</p> <p class="gray">'+_val.gray+'</p> </li>';
					}
				})
				html += '</ul> </li>';
			}

		});

		$(data.element).html(html);
		// console.log("加载完html了")
		if (_callback && typeof _callback == "function") {
			_callback();
		};
	}
	

	this.refesh = function(_page){
		var flag = false;
		if (!data.data && data.url){
			init(function(){
				generHtml(_page);

			});
		}else if (data.data ) {
			generHtml(_page)
		};
		
		
	}


	this.refesh();
} 


;(function($){

	$.getUrlParam= function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r   = window.location.search.substr(1).match(reg);
		if (r!=null){ 
			return unescape(r[2]);
		} 
		return null;
	}
})(jQuery);


//2遮罩函数
var shade = function(){
	if ($('.mask')[0]) {
		$('.mask').show();
	} else {
		$('<div class="mask"><i class="fa fa-spinner fa-spin"></i></div>').appendTo('body').show();
	}
}




//3.全局处理每个html的函数
$(function(){
	$(document).on("touchstart",function(evt){
		if ($(evt.target).is(".topgo")) {
			window.history.back();
		}else if ($(evt.target).is(".toplist")) {
			$(evt.target).next().toggle();
		};;
	})
})



  