$(function(){
    // 懒加载
    $("img").lazyload();
    /*导航栏点击实时更改颜色*/
    var tabtitle=$('.daohang_a ul li');
    tabtitle.click(function()
    {
        tabtitle.css({
            "text-align": "center",
            "color":"white",
            "border":"none"
        })
        $(this).css({
            "border":"white",
            "color":"orange"
        })
    })
    var hashpath = location.hash.substring(2)
    switch (hashpath){
        case "home":
            $('.daohang_a ul li:eq(1)').css({"border":"white","color":"orange"})
            break;
        case "blog":
            $('.daohang_a ul li:eq(2)').css({"border":"white","color":"orange"})
            break;
        case "title":
            $('.daohang_a ul li:eq(3)').css({"border":"white","color":"orange"})
            break;
        case "friend":
            $('.daohang_a ul li:eq(4)').css({"border":"white","color":"orange"})
            break;
        case "":
            $('.daohang_a ul li:eq(1)').css({"border":"white","color":"orange"})
            break;    
        default :
            $('.daohang_a ul li:eq(1)').css({"border":"white","color":"orange"})
    }
    
    
        /*点击导航栏或指定区域触发点击事件更改hash值*/
    $(document).on("click", ".center", function(){
        var text_Id = $(this).children('.valueid').text()
       window.$router.changeHash("/content?text_Id="+text_Id)
       $(window).scrollTop(0)
    });
    $("#rightbarh").on("click", ".zuijin", function(){
        var zuijin_Id = $(this).children("span").text()
        window.$router.changeHash("/content?text_Id="+zuijin_Id)
       $(window).scrollTop(0)
    });
     $('.daohang').on("click", "ul li:eq(1)", function(){
         window.$router.changeHash("/home")
    });
     $('.daohang').on("click", "ul li:eq(2)", function(){
           window.$router.changeHash("/blog")
    });
    $('.daohang').on("click", "ul li:eq(3)", function(){
          window.$router.changeHash("/title")
    });
    $('.daohang').on("click", "ul li:eq(4)", function(){
          window.$router.changeHash("/friend")
    });
    $('.daohang').on("click", ".daohang_a p:eq(1)", function(){
          window.$router.changeHash("/search")
    });
    $("#mnb").on("click", "li", function(){
        var year = $(this).text()
         window.$router.changeHash("/blog?year="+year)
         $(window).scrollTop(0)
    });
    $("#qwe").on("click", "li", function(){
        var class_id = $(this).text()
         window.$router.changeHash("/classify?class_id="+class_id)
         $(window).scrollTop(0)
    });
    $(".left_bar_f").on("click", "ul li", function(){
        var label_id = $(this).text()
         window.$router.changeHash("/label?label_id="+label_id)
         $(window).scrollTop(0)
    });
    //content a 标签阻止冒泡事件
    $(".jixuyuedu").click(function(event) {
         event.preventDefault(); 
      });
    
    //切换夜间模式的方法
    $(document).on("click", ".daohang_a p:eq(2)", function(){
    if($('html').attr("color-mode")=='dark'){
        document.documentElement.setAttribute("color-mode", "light");
        localStorage.setItem("color-mode", "light")
        // 解决老版本网站主背景使用var变量不兼容问题
         $('body').css({ 
            "background":" url(../img/bg.jpg)",
            "transition":" 0.4s"
                        })
    }
    else{
        document.documentElement.setAttribute("color-mode", "dark");
        localStorage.setItem("color-mode", "dark")
        // 解决老版本网站主背景使用var变量不兼容问题
         $('body').css({ 
            "background":" url(../img/bg2.jpg)",
            "transition":" 0.4s"
                        })
    }
    }); 
    $(document).on("click", ".daohang_a p:eq(3)", function(){
      window.open('_blank').location = "http://101.43.93.193/admin/admin.html"
    });
    // 获取localStorage
    var colormode = localStorage.getItem('color-mode')
    if (colormode != null) {
           document.documentElement.setAttribute("color-mode", colormode);
          }
          else{ 
           document.documentElement.setAttribute("color-mode", "light");
           // 解决老版本网站主背景使用var变量不兼容问题
           $('body').css({ 
            "background":" url(../img/bg.jpg)",
            "transition":" 0.4s"
                        })
          }
          // 解决老版本网站主背景使用var变量不兼容问题
    if(colormode=='dark'){
        $('body').css({ 
            "background":" url(../img/bg2.jpg)",
            "transition":" 0.4s"
                        })
    }
    else{
        $('body').css({ 
            "background":" url(../img/bg.jpg)",
            "transition":" 0.4s"
                        })
    }
    //标签懒加载
$(window).scroll(function(e){
    for(let i=0; i<$('.lazyload').length; i++) {
        if(($($('.lazyload')[i]).offset().top - $(window).scrollTop()) < window.innerHeight) {
            $($('.lazyload')[i]).css({
                'display':'block'
            });
        }
    }
})
    var year = new Date().getFullYear() 
    var yeararry= new Array
    for(var i=0;i<=4;i++){
        var y = year-i
        yeararry.push(y)
    }
    var yearhtml =''
    $.each(yeararry, function(i, value) {yearhtml += `<li>${value}</li>`})

    
$("#mnb").html(yearhtml)
    var routerMap = {
        "": {
            "redirect": "home"
        },
        "home": {
            "path": "../center.html",
            "son": {}
        },
        "content": {
            "path": "../content.html",
            "son": {}
        },
        "title": {
            "path": "../biaoqian.html",
            "son": {}
        },
        "blog": {
            "path": "../guidang.html",
            "son": {}
        },
        "friend":{
           "path": "../youlian.html",
            "son": {}
        },
        "search":{
          "path":"../search.html",
        }    ,
        "classify":{
          "path":"../classify.html",
        }  ,
        "label":{
          "path":"../label.html",
        }
    }
    window.$router.initial(routerMap)
}) 
window.onload=function(){
	const leftbarh = `<img src="img/761e022dbfaeee51bcbaac259c7311b.jpg"/>
			<p>Yuyou</p>
			<p>永远热爱，永远热泪盈眶</p>
			<ul >
				<li>100</li>
				<li>10</li>
				<li>100</li>
				<li>40</li>
				<li>文章</li>
				<li>分类</li>
				<li>标签</li>
				<li>万字</li>
			</ul>`
	$('.skeleton-box').hide()
	$('.left_bar_h').show()
	$('.left_bar_c').show()
	$('.left_bar_f').show()
	$('.right_bar_h').show()
	$('.right_bar_c').show()
	$('#router-view-1').show()
	$('.daohang').show()
	$('.left_bar_h').html(leftbarh)
}