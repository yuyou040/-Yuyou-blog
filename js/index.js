$(function(){
    $(document).on("click", ".zuiclass", function(){
        $("#center_bar").load("content.html");
        window.location.href = "#?id="+"content";
    })
     $(document).on("click", "ul li:eq(1)", function(){
         $("#center_bar").load("one.html");
          window.location.href = "#"+"index";
    });
     $(document).on("click", "ul li:eq(2)", function(){
         $("#center_bar").load("guidang.html");
          window.location.href = "#"+"flie";
    });
    $(document).on("click", "ul li:eq(3)", function(){
         $("#center_bar").load("biaoqian.html");
          window.location.href = "#"+"title";
    });
    $(window).scroll(function() {
    	if ($(document).scrollTop() > 400) {
    		$(".guding").addClass("cixi");
    	}
        else if($(document).scrollTop()<400){
            $(".guding").removeClass("cixi");
        }
    })
   
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
            "background":"#265e8f",
            "border":"white"
        })
    })



    window.addEventListener("hashchange", function() {
    // 获取hash值
    var hash = window.location.hash;
    if (hash=="#content") {
         window.location.href = "content.html";
    }
    // 根据获取的hash做相应的操作
});
}) 
