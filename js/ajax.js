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
    
    //获取最近文章的接口
    function actlately() {
        var url = 'http://192.168.47.1/myblog/asp/content.asp?articles=lately';
        $.ajax(url, {
            dataType: 'json',
            async: false,
            type: 'get',
            headers: {
                'Content-Type': undefined
            },
            timeout: 5000,
            success: function(data) {
               var actlately = data.AdminList 
               var actlatelyhtml='';
               $.each(actlately, function(i, value) {
                   actlatelyhtml += `
                        <div class="zuijin">
                        	<p class="create_date" style="margin-bottom:10px;">${value.create_date}</p>
                        	<p>${value.title}</p>
                            <span style="display:none">${value.id}</span>
                        	<hr />
                        </div>
                  `
               })
               
               $("#rightbarh").html(actlatelyhtml)
               
            },
            error: function(xhr, type, errorThrown) {
                console.log(errorThrown)
            }
        });
    }
    actlately() 
    $(".create_date").text($(".create_date").text().substring(0,10))
})
