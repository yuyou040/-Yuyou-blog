$(function(){
    /*导航栏点击实时更改颜色*/
    var tabtitle=$('.daohang_a ul li');
    tabtitle.click(function()
    {
        tabtitle.css({
            "background":"linear-gradient(to bottom,#4584b9,#2e70a5)",
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


  /**/
    $(window).scroll(function() {
      if ($(document).scrollTop() > 400) {
        $(".guding").addClass("cixi");
      }
        else if($(document).scrollTop()<400){
            $(".guding").removeClass("cixi");
        }
    })
   


    /*点击导航栏或指定区域触发点击事件更改hash值*/
    $(document).on("click", ".zuiclass", function(){
       window.$router.to("content")
    })
     $(document).on("click", "ul li:eq(1)", function(){
         window.$router.to("one")
    });
     $(document).on("click", "ul li:eq(2)", function(){
           window.$router.to("guidang")
    });
    $(document).on("click", "ul li:eq(3)", function(){
          window.$router.to("biaoqian")
    });
    $(document).on("click", "ul li:eq(4)", function(){
          window.$router.to("youlian")
    });

  
     let routerMap = {
        "": {
            "redirect": "one"
        },
        "one": {
            "path": "../myblog/one.html",
            "son": {}
        },
        "content": {
            "path": "../myblog/content.html",
            "son": {}
        },
        "biaoqian": {
            "path": "../myblog/biaoqian.html",
            "son": {}
        },
        "guidang": {
            "path": "../myblog/guidang.html",
            "son": {}
        },
        "youlian":{
           "path": "../myblog/youlian.html",
            "son": {}
        }        
        // "404": {
        //     "path": "./404/index.html"
        // }
    }

    window.$router.initial(routerMap)

}) 
