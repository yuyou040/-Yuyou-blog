$(function() {
    	    /*获取标签*/
    	    function biaoqian() {
    	        var url ='http://192.168.47.1/myblog/asp/app.asp?action=read';
    	        $.ajax(url, {
    	            dataType: 'json',
    	            async: true,  
    	            type: 'get',  
    	            headers: {'Content-Type': undefined},
    	            timeout: 100000, //超时时间设置为100秒；
         	       success: function(data) {
    	                var qwe = data
    	                console.log(qwe)
    	            },
    	            error: function(xhr, type, errorThrown) {
    	                console.log('当前网络不佳')
    	            }
    	        });
    	    }
    	    biaoqian();
            
            
             /* 获取博客详情*/
            function content(){
                var url='http://192.168.47.1/myblog/asp/content.asp?action=read_content';
                $.ajax(url, {
                    dataType: 'json',
                    async: true,  
                    type: 'get',  
                    headers: {'Content-Type': undefined},
                    timeout: 100000, //超时时间设置为100秒；
                   success: function(data) {
                        var qwe = data
                        console.log(qwe)
                    },
                    error: function(xhr, type, errorThrown) {
                        console.log('当前网络不佳')
                    }
                });
            }
            content()
            
            // 获取博客分类
            
            function category(){
                var url='http://192.168.47.1/myblog/asp/category.asp?action=read_category';
                $.ajax(url, {
                    dataType: 'json',
                    async: true,  
                    type: 'get',  
                    headers: {'Content-Type': undefined},
                    timeout: 100000, //超时时间设置为100秒；
                   success: function(data) {
                        var qwe = data
                        console.log(qwe)
                    },
                    error: function(xhr, type, errorThrown) {
                        console.log('当前网络不佳')
                    }
                });
            }
    	})
