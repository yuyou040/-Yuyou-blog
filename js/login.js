$(function() {
    var token = localStorage.getItem('token')
    var present =Date.parse(new Date()).toString().substring(0,10)//获取当前时间
    if (token != null) {
        var strings = token.split(".");
        var userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g,
            "/")))));
        if(present<userinfo.exp){
            window.location.href = "http://192.168.47.1/admin/admin.html";
        }
    }
    //登录ajax请求
    $(".btn").click(function() {
        var username = $("#usrn").val()
        var password = $("#mima").val()
        if ($("#usrn").val() == "") {
            alert('用户名不能为空');
        } else if ($("#mima").val() == "") {
            alert('密码不能为空');
        }
        var url = 'http://192.168.47.1/asp/token.asp?username=' + username + '&password=' +
            password;
        $.ajax(url, {
            async: false,
            type: 'get',
            headers: {
                'Content-Type': undefined
            },
            timeout: 5000,
            success: function(data) {
                var data = JSON.parse(data)
                switch (data.code) {
                    case 200:
                        localStorage.setItem("token", data.token)
                        window.location.href =
                        "http://192.168.47.1/admin/admin.html";
                        break;
                    case 401:
                        alert("抱歉登录失败")
                        break;
                }
            },
            error: function(xhr, type, errorThrown) {
                console.log(errorThrown)
            }
        });
    })

})
