document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
onload = function(){
	document.ondragstart = function(){
		return false;
	}


	var  myScroll = new IScroll('#wrapper',{
		scrollbars: true,
		mouseWheel: true,
		interactiveScrollbars:true
	});
	
	
	
	var refrsh = function(){
		myScroll.refresh();

	} 

	//请求数据
	var data = new Data({url:"libs/data/user.txt",element:"#wrapper>ul",user:"4"},function(){
		
		if(localStorage.getItem("user")){
			$("#userName").text(localStorage.getItem("user"));
		}
		refrsh();
	});
}