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
                                   <td><button style="background-color:rgba(35, 183, 166, 0.8);">编辑</button></td>
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

    function image2Base64(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL;
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
        var base64 = "";
        var form = document.getElementById("tijiao")
        var file = document.getElementById("file")
        var fileName = file.files[0].name; //获取文件名
        var filePath = file.value; //文件fake路径
        var objURL = getObjectURL(file.files[0]); //获取文件的真实路径
        var formData = new FormData();
        var title = $("#titletxt").val()
        var fenlei = $("#tijiao select option:selected").val()
        formData.append("title", title)
        formData.append("fenlei", fenlei)
        // base64String(file.files[0])
        // .then((base64) => {
        //     formData.append("file", base64)
        //     console.log(formData.get('file'))
        // })
        // .then(()=>{

        // })
        var img = new Image();
        img.src=objURL
        base64=image2Base64(img)
        console.log(base64)
        $('#commitModal').fadeToggle("slow");
        //window.$router.changeHash("/ueditor")
    })
    //点击新增文章
    $(".creat button").click(function() {
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


})
