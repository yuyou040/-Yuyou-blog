$(function() {
    function Article() {
        var url = 'http://192.168.47.1/myblog/asp/content.asp?admin=Article';
        $.ajax(url, {
            dataType: 'json',
            async: false,
            type: 'get',
            headers: {
                'Content-Type': undefined
            },
            timeout: 5000,
            success: function(data) {
                var Article = data.AdminList
                var Articlehtml = ''
                $.each(Article, function(i, value) {
                    Articlehtml += `
                               <tr style="background-color: rgba(1, 64, 142, 0.1);">
                                   <td style="padding-left:41px;"class="tdid">${value.id}</td>
                                   <td style="padding-left:60px;"><p class="tdtitle">${value.title}</p></td>
                                   <td>${value.class}</td>
                                   <td>${value.create_date}</td>
                                   <td><button class="edit" style="background-color:rgba(35, 183, 166, 0.8);">编辑</button></td>
                                   <td><button class="delshan" style="background-color:rgba(255, 0, 0, 0.6);">删除</button></td>
                               </tr>
                         `
                })
                $('#tdlist').html(Articlehtml)
            },
            error: function(xhr, type, errorThrown) {
                console.log(errorThrown)
            }
        });
    }
    Article()

    var delid;

    function delblog() {
        var url = 'http://192.168.47.1/myblog/asp/del_add.asp?action=delete&delid=' + delid;
        $.ajax(url, {
            dataType: 'json',
            async: false,
            type: 'get',
            headers: {
                'Content-Type': undefined
            },
            timeout: 5000,
            success: function() {
                // t.b.d强制刷新待优化
                location.reload()
            },
            error: function(xhr, type, errorThrown) {
                console.log(errorThrown)
            }
        });
    }

    //获取图片路径的方法
    function getObjectURL(file) {
        var url = null;
        if (window.createObjcectURL != undefined) {
            url = window.createOjcectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }


    function base64String(file) {
        return new Promise((resolve, reject) => {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            //监听文件读取结束后事件    
            reader.onloadend = function(e) {
                var base64String = e.target.result
                resolve(base64String)
            };
        })
    }

    $('#commitModal').hide();
    //点击内容不触发,阻止事件冒泡
    $(".modal-dialog").click(function(e) {
        e.stopPropagation();
    });

    //点击关闭
    $("#close").click(function() {
        $('#commitModal').fadeToggle("slow");
    });

    //点击取消
    $("#cancel").click(function() {
        $('#commitModal').fadeToggle("slow");
    });
    //点击确定
    $("#sure").click(function() {
        var fileInput = $('#file').get(0).files[0];
        if ($("#titletxt").val() || $("#tijiao select").val() || fileInput) {
            $("#tijiao").submit()
            $('#commitModal').fadeToggle("slow");
        } else {
            alert("必填项不能为空")
        }
        setTimeout("location.reload(true)", 100)
        //window.$router.changeHash("/ueditor")
    })
    //点击新增文章
    $(".creat button").click(function() {
        $("#tijiao")[0].reset()
        $('#commitModal').fadeToggle("slow");
    })

    //删除blog
    $(".delshan").click(function(e) {
        delid = $(this).parent().siblings(".tdid").text()
        var msg = "您真的确定要删除吗？\n\n请确认！";
        if (confirm(msg) == true) {
            delblog()
            location.reload()
        } else {
            return false;
        }
    })
    // 点击编辑跳转传id
    
    $(".edit").click(function(){
        var editid = $(this).parent().siblings(".tdid").text()
        window.$router.changeHash("/ueditor?editid=" + editid)
        $(window).scrollTop(0)
    })
})
