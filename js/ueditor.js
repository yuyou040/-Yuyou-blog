$(function() {
  var token = localStorage.getItem('token')
        var strings = token.split(".");
        var userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g,
            "/")))));
        var present = Date.parse(new Date()).toString().substring(0, 10) //获取当前时间
        if (present>userinfo.exp) {
           window.location.href = "http://192.168.47.1/myblog/admin/login.html";
        }
    UE.delEditor('editor');
    var ue = UE.getEditor('editor');

    function isFocus(e) {
        alert(UE.getEditor('editor').isFocus());
        UE.dom.domUtils.preventDefault(e)
    }

    var editid = new URLSearchParams(window.location.hash.split('?')[1]).get('editid');

    function edit() {
        var token = localStorage.getItem('token')
        var strings = token.split(".");
        var userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g,
            "/")))));
        var present = Date.parse(new Date()).toString().substring(0, 10)//获取当前时间
        if (present>userinfo.exp) {
           window.location.href = "http://192.168.47.1/myblog/admin/login.html";
        }
        var url = 'http://192.168.47.1/myblog/asp/content.asp?action=edit&editid=' + editid;
        $.ajax(url, {
            dataType: 'json',
            async: false,
            type: 'get',
            headers: {
                'Content-Type': undefined
            },
            timeout: 5000,
            success: function(data) {
                var content = data.AdminList
                ue.addListener("ready", function() {
                    ue.setContent(content[0].content);
                })
            },
            error: function(xhr, type, errorThrown) {
                console.log(errorThrown)
            }
        });
    }
    edit()



    $("button").click(function() {
     var token = localStorage.getItem('token')
     var strings = token.split(".");
     var userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g,
         "/")))));
     var present = Date.parse(new Date()).toString().substring(0, 10) //获取当前时间
     if (present>userinfo.exp) {
        window.location.href = "http://192.168.47.1/myblog/admin/login.html";
     }
        if (UE.getEditor('editor').getContent() == "") {
            alert('请输入内容');
        }
        var formData = jQuery.trim(ue.getContent());
        var url = 'http://192.168.47.1/myblog/asp/del_add.asp?action=upload&upid=' + editid;
        $.ajax(url, {
            async: false,
            type: 'POST',
            data: {
                'content':formData
            },
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
        window.$router.changeHash("/Article")
    })

})
