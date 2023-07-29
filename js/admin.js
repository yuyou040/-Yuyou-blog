$(function() {
    var token = localStorage.getItem('token')
    if (token == null) {
        $("#bestbox").css({
            "display": "none"
        })
        window.location.href = "http://101.43.93.193/admin/login.html";
    }
    var strings = token.split(".");
    var userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g,
        "/")))));
    /* 时间戳转换为时间 */
    function timestampToTime(timestamp) {
        timestamp = timestamp ? timestamp : null;
        let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return Y + M + D + h + m + s;
    }
    var exptime = timestampToTime(userinfo.exp * 1000)//获取过期时间
    var present =timestampToTime(Date.parse(new Date()).toString().substring(0,10)*1000)//获取当前时间
    if(present>exptime){
        localStorage.removeItem("token") 
        window.location.href = "http://101.43.93.193/admin/login.html";
    }
    
    $("#leftdaohang ul div").click(function() {
        $("#leftdaohang ul div").css({
            "background-color": "var(--surface2)",
            "border-right": "none"
        })
        $(this).css({
            "background-color": "rgba(1,64,142,0.3)",
            "border-right": "#01408e 5px solid"
        })
    })
    $("#zhuzhan").click(function() {
        window.open('_blank').location = "http://101.43.93.193/index.html"
    })
    $(document).on("click", "#fenxi", function() {
        window.$router.to("/analysis")
    })
    $(document).on("click", "#wenzhang", function() {
        window.$router.to("/Article")
    })
    $(document).on("click", "#caogao", function() {
        window.$router.to("/draft")
    })
    $(document).on("click", "#tupian", function() {
        window.$router.to("/pictures")
    })
    $(document).on("click","#loginout",function(){
        localStorage.removeItem("token")
        window.location.href = "http://101.43.93.193/admin/login.html";
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
        },
        "ueditor": {
            "path": "../admin/ueditor.html",
            "son": {}
        }
    }
    window.$router.initial(routerMap)
})

window.onload=function(){
	$("body").show()
}
