$(function(){
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
            "background":"white",
            "border":"white",
            "color":"black"
        })
    })
        /*点击导航栏或指定区域触发点击事件更改hash值*/
    $(document).on("click", ".center", function(e){
        var text_Id = $(this).children('.valueid').text()
       window.$router.changeHash("/content?text_Id="+text_Id)
       $(window).scrollTop(0)
    })
     $(document).on("click", "ul li:eq(1)", function(){
         localStorage.setItem("page",1)
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
        }       
    }
    window.$router.initial(routerMap)
}) 
