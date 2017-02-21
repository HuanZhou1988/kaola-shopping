window.onload = function(){

      
  var  myScroll = new IScroll('#wrapper',{
    scrollbars: true,
    mouseWheel: true,
    interactiveScrollbars:true
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

    var opt = {
      element:"#wrapper>ul",
      page:5
    }

    var getItem = localStorage.getItem("cart");
    if(getItem && JSON.parse(getItem)[0]){
        _array = JSON.parse(getItem);
        opt.data = _array;
        //请求数据
       var data = new Data(opt,load);
    }else{
        console.log("购物车里面没有什么东西");
    }
         
    //实现翻页
    var opts = {
      flag:false,
      index:1,
      start:5,//刚开始加载的数据
      times:3,//数据加载的跨度
      element:data
    }

    myScroll.on('scrollEnd', function () {
        if ( this.y <= myScroll.maxScrollY && myScroll.maxScrollY != opts.flag) {
        opts.flag = myScroll.maxScrollY;
        opts.element.refesh(opts.start + opts.index * opts.times);
          opts.index++
        }
    });


      var setitem = function(){
         //5.存进购物车里面
          var _array = [];
          $(".good").each(function(index,value){
              var data = {};
              data.cart = "cart";
              data.src = $(".produce",value).attr("src");
              data.title = $(".title",value).text();
              data.price = $(".sum",value).text();
              data.id    = $(value).attr("id");
              data.count = $(".num",value).text();
              _array.push(data);
          })

          console.log(_array.length);
          localStorage.setItem('cart', JSON.stringify(_array)); 
      }

      var  calculate = function(){
           //4.计算总数
            var allnum = 0;
            var allsum = 0;
            $(".checked").each(function(index,value){
              if ($(this).attr("check") == "true") {
                var parent = $(this).closest("li");
                var num1   = $(".num",parent).html();
                var sum1   = $(".sum",parent).html();
                allsum += parseInt(num1) * parseInt(sum1);
                allnum += parseInt(num1);  
              }
              
            })
            $("#sum").text(allsum);

      }

     //点击事件
     var $shopall = $("#checkall");
      $("body").on("touchstart",function(evt){  
          //1.加减函数
          if($(evt.target).is(".fa-plus")){
            var parent = $(evt.target).closest("li");
            var count  = parseInt($(".num",parent).html());
            $(".num",parent).html(count < 100 ? count + 1 : 100);
            setitem();
            calculate();

          }else if($(evt.target).is(".fa-minus")){
            var parent = $(evt.target).closest("li");
            var count  = parseInt($(".num",parent).html());
            $(".num",parent).html(count > 1 ? count - 1 : 1);
            setitem();
            calculate();
          } 

          //2.全选函数
          var $check = $(".checked");
          if ($(evt.target).is("#checkall")) {
            //对自己
            if ($(evt.target).attr("check") == "true") {
              $(evt.target).addClass("fa-circle-o").removeClass("fa-check-circle").attr("check","false");
            }else{
              $(evt.target).addClass("fa-check-circle").removeClass("fa-circle-o").attr("check","true");
            };
            //对他人
            $check.attr("check",$(evt.target).attr("check"));
            if ($check.attr("check") == "true") {
              $check.addClass("fa-check-circle").removeClass("fa-circle-o");
            }else{
              $check.addClass("fa-circle-o").removeClass("fa-check-circle");
            };
            calculate();

          }else if ($(evt.target).is(".checked")) {
            //对自己
            if ($(evt.target).attr("check") == "true") {
                $(evt.target).addClass("fa-circle-o").removeClass("fa-check-circle").attr("check","false");
            }else{
                $(evt.target).addClass("fa-check-circle").removeClass("fa-circle-o").attr("check","true");
            };
            //对他人
            var $checkNum = $("i[check=true]").not("#checkall");
            $("#checkall").attr("check",($checkNum.length == $check.length));
             if ($("#checkall").attr("check") == "true") {
                $("#checkall").addClass("fa-check-circle").removeClass("fa-circle-o");
            }else{
                $("#checkall").addClass("fa-circle-o").removeClass("fa-check-circle");
            };
            calculate();
          }


          //3.删除购物车商品
          if($(evt.target).is(".fa-trash-o")){
              $(evt.target).closest("li").remove();
              alert("删除购物车商品");
              load();
              calculate();
              setitem();
          }

          //4.支付方式
          if($(evt.target).is(".page")){
            $("#mark").show();
            $("#page").show();
          }

          if($(evt.target).is("#page>div")){
            $("#mark").hide();
            $("#page").hide();
          }         
      })
}
