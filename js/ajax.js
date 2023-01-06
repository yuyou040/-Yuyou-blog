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
                for (var i = 0; i < 9; i++) {
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
                var categoryhtml=`
                    <li>${data.technology}</li>
                    <li>${data.note}</li>
                    <li>${data.creation}</li>
                    <li>${data.selfwords}</li>
                    <li>${data.share}</li>
                    <li>${data.others}</li>
                `
                $("#asd").html(categoryhtml)
            },
            error: function(xhr, type, errorThrown) {
                console.log(errorThrown)
            }
        });
    }
    category()
    //获取归档api
    function archive() {
        var url = 'http://192.168.47.1/myblog/asp/category.asp?action=create_date';
        $.ajax(url, {
            dataType: 'json',
            async: false,
            type: 'get',
            headers: {
                'Content-Type': undefined
            },
            timeout: 5000,
            success: function(data) {
                var archivehtml=`
                    <li>${data.yiba}</li>
                    <li>${data.yijiu}</li>
                    <li>${data.erling}</li>
                    <li>${data.erli}</li>
                    <li>${data.erer}</li>
                `
                $("#zxc").html(archivehtml)
            },
            error: function(xhr, type, errorThrown) {
                console.log(errorThrown)
            }
        });
    }
    archive()
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
    function search(search) {
        var url = 'http://192.168.47.1/myblog/asp/content.asp?action=search&searchvalue='+search;
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
               var contentHtml = '';
               
               $.each(content, function(i, value) {
                   contentHtml += `
                  <div class="center">
                   <p style="display:none;" class="valueid">${value.id}</p>
                     						<img  data-original= ${value.imgaes}/>
                     						<h4>${value.title}</h4>
                     						<p>${value.brief}</p>
                     						<div class="xiaobiao">
                     						<span>${value.create_date}</span><a>${value.label}</a>
                     						<a href="#" class="jixuyuedu">继续阅读</a>
                     						</div>
                     					</div>
                  `
               })
               $(".zuiclass").html(contentHtml)
               $("img").lazyload();
            },
            error: function(xhr, type, errorThrown) {
                console.log(errorThrown)
            }
        });
    }
    // 搜索查询代码
    $(document).on('input propertychange','#sicon input',function(){
        if($("#sicon input").val().length>0){
            let timeout;
            (function throttling(){
            	//先清理
            	clearTimeout(timeout)	
            	timeout = setTimeout(() => {
               var sval=$("#sicon input").val()
                  search(sval)
            	}, 1500)
            })()
        }
        else{
            $(".zuiclass").html('')
        }
    })
    
    
})
