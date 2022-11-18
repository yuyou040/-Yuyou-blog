$(function() {
    $("#leftdaohang ul div").click(function()
    {
        $("#leftdaohang ul div").css({
            "background-color":"var(--surface2)",
            "border-right":"none" 
        })
        $(this).css({
            "background-color": "rgba(1,64,142,0.3)",
            "border-right": "#01408e 5px solid"
        })
    })
    $("#zhuzhan").click(function() {
        window.open('_blank').location = "http://192.168.47.1/myblog/index.html"
    })
    $(document).on("click", "#fenxi", function(){
       window.$router.to("/analysis")
    })
    $(document).on("click", "#wenzhang", function(){
       window.$router.to("/Article")
    })
    $(document).on("click", "#caogao", function(){
       window.$router.to("/draft")
    })
    $(document).on("click", "#tupian", function(){
       window.$router.to("/pictures")
    })
    var routerMap = {
        "": {
            "redirect": "analysis"
        },
        "analysis": {
            "path": "../admin/analysis.html",
            "son": {}
        },
        "Article": {
            "path": "../admin/Article.html",
            "son": {}
        },
        "draft": {
            "path": "../admin/draft.html",
            "son": {}
        },
        "pictures": {
            "path": "../admin/pictures.html",
            "son": {}
        }
    }
    window.$router.initial(routerMap)
})
