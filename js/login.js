$(function() {
    //登录ajax请求
    $(".btn").click(function() {
        // window.location.href = "http://192.168.47.1/myblog/admin/admin.html";
        var username = $("#usrn").val()
        var password = $("#mima").val()
        if ($("#usrn").val() == "") {
            alert('用户名不能为空');
        }
        else if($("#mima").val() == ""){
            alert('密码不能为空');
        }
       var url = 'http://192.168.47.1/myblog/asp/token.asp?username='+username+'&password='+password;
       $.ajax(url, {
           async: false,
           type: 'get',
           headers: {
               'Content-Type': undefined
           },
           timeout: 5000,
           success: function(data) {
               
           },
           error: function(xhr, type, errorThrown) {
               console.log(errorThrown)
           }
       });
    })
    
})
