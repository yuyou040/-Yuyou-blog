$(function() {
    /*获取标签*/
    function biaoqian() {
        var url = 'http://192.168.47.1/myblog/asp/app.asp?action=read';
        $.ajax(url, {
            dataType: 'json',
            async: true,
            type: 'get',
            headers: {
                'Content-Type': undefined
            },
            timeout: 5000,
            success: function(data) {
                var title = data.data
                for (var i = 0; i < title.length; i++) {
                    $('.left_bar_f ul').append($('<li>' + title[i] + '</li>'))
                }
                $('.left_bar_f ul li').css({
                    "padding": "0 8px 0 8px"
                })
            },
            error: function(xhr, type, errorThrown) {
                console.log(errorThrown)
            }
        });
    }
    biaoqian();

    // 获取博客分类
    function category() {
        var url = 'http://192.168.47.1/myblog/asp/category.asp?action=read_category';
        $.ajax(url, {
            dataType: 'json',
            async: true,
            type: 'get',
            headers: {
                'Content-Type': undefined
            },
            timeout: 5000,
            success: function(data) {
               var arry= Object.values(data);
               for (var i = 0; i < arry.length; i++) {
                   $('#asd').append($('<li>' + arry[i] + '</li>'))
               }
            },
            error: function(xhr, type, errorThrown) {
                console.log(errorThrown)
            }
        });
    }
    category()
})
