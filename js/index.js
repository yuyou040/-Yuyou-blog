$(function(){
    // 懒加载
    $("img").lazyload();
    /*导航栏点击实时更改颜色*/
    var tabtitle=$('.daohang_a ul li');
    tabtitle.click(function()
    {
        tabtitle.css({
            "background":"var(--surface1)",
            "border-radius":"0.3125rem",
            "text-align": "center",
            "color":"white",
            "border":"none"
        })
        $(this).css({
            "background":"rgba(255,255,255,0.3)",
            "border":"white",
            "color":"orange"
        })
    })
    
        // function htmlScroll(elFix) {
        //       var top = document.body.scrollTop || document.documentElement.scrollTop;
        //       if (elFix.data_top < top) {
        //           elFix.style.position = 'fixed';
        //           elFix.style.top = 0;
        //           elFix.style.left = elFix.data_left;
        //       }
        //       else {
        //           elFix.style.position = 'static';
        //       }
        //   }
        // htmlScroll($(".left_bar_h"))
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
     $(document).on("click", "ul li:eq(1)", function(){
         window.$router.changeHash("/home")
    });
     $(document).on("click", "ul li:eq(2)", function(){
           window.$router.changeHash("/blog")
    });
    $(document).on("click", "ul li:eq(3)", function(){
          window.$router.changeHash("/title")
    });
    $(document).on("click", "ul li:eq(4)", function(){
          window.$router.changeHash("/friend")
    });
    $(document).on("click", ".daohang_a p:eq(1)", function(){
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
    
    
    
    //切换夜间模式的方法
    $(document).on("click", ".daohang_a p:eq(2)", function(){
    if($('html').attr("color-mode")=='dark'){
        document.documentElement.setAttribute("color-mode", "light");
        localStorage.setItem("color-mode", "light")
        // 解决老版本网站主背景使用var变量不兼容问题
         $('body').css({ 
            "background":" url(../myblog/img/bg.jpg)",
            "transition":" 0.4s"
                        })
    }
    else{
        document.documentElement.setAttribute("color-mode", "dark");
        localStorage.setItem("color-mode", "dark")
        // 解决老版本网站主背景使用var变量不兼容问题
         $('body').css({ 
            "background":" url(../myblog/img/bg2.jpg)",
            "transition":" 0.4s"
                        })
    }
    }); 
    $(document).on("click", ".daohang_a p:eq(3)", function(){
      window.open('_blank').location = "http://192.168.47.1/myblog/admin/admin.html"
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
            "background":" url(../myblog/img/bg.jpg)",
            "transition":" 0.4s"
                        })
          }
          // 解决老版本网站主背景使用var变量不兼容问题
    if(colormode=='dark'){
        $('body').css({ 
            "background":" url(../myblog/img/bg2.jpg)",
            "transition":" 0.4s"
                        })
    }
    else{
        $('body').css({ 
            "background":" url(../myblog/img/bg.jpg)",
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
            "path": "../myblog/center.html",
            "son": {}
        },
        "content": {
            "path": "../myblog/content.html",
            "son": {}
        },
        "title": {
            "path": "../myblog/biaoqian.html",
            "son": {}
        },
        "blog": {
            "path": "../myblog/guidang.html",
            "son": {}
        },
        "friend":{
           "path": "../myblog/youlian.html",
            "son": {}
        },
        "search":{
          "path":"../myblog/search.html",
        }    ,
        "classify":{
          "path":"../myblog/classify.html",
        }  ,
        "label":{
          "path":"../myblog/label.html",
        }
    }
    window.$router.initial(routerMap)
}) 
