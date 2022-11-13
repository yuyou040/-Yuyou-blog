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
    // $(window).scroll(function() {
    //   if ($(document).scrollTop() > 400) {
    //     $(".guding").addClass("cixi");
    //   }
    //     else if($(document).scrollTop()<400){
    //         $(".guding").removeClass("cixi");
    //     }
    // })
    var darkligt=$("#darklist");
    /*点击导航栏或指定区域触发点击事件更改hash值*/
    $(document).on("click", ".zuiclass", function(){
       window.$router.to("content")
    })
     $(document).on("click", "ul li:eq(1)", function(){
         window.$router.to("home")
    });
     $(document).on("click", "ul li:eq(2)", function(){
           window.$router.to("blog")
    });
    $(document).on("click", "ul li:eq(3)", function(){
          window.$router.to("title")
    });
    $(document).on("click", "ul li:eq(4)", function(){
          window.$router.to("friend")
    });
    $(document).on("click", ".daohang_a p:eq(1)", function(){
          window.$router.to("search")
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
    
     let routerMap = {
        "": {
            "redirect": "home"
        },
        "home": {
            "path": "../myblog/one.html",
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
        // "404": {
        //     "path": "./404/index.html"
        // }
    }
    window.$router.initial(routerMap)
}) 
