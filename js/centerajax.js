$(function() {
     /* 获取博客详情*/
     var recordcount, atext
     var pageid = 1;

     function content() {
         var url = 'http://192.168.47.1/myblog/asp/content.asp?action=read_content&pageId=' + pageid;
         $.ajax(url, {
             dataType: 'json',
             async: false,
             type: 'get',
             headers: {
                 'Content-Type': undefined
             },
             timeout: 5000,
             success: function(data) {
                 recordcount = data.recordcount
                 localStorage.setItem("recordcounts", "recordcount")
                 var content = data.AdminList
                 var contentHtml = '';
                 $.each(content, function(i, value) {
                     contentHtml += `
                    <div class="center">
                     <p style="display:none;" class="valueid">${value.id}</p>
						<img  src= ${value.imgaes}/>
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
             },
             error: function(xhr, type, errorThrown) {
                 console.log(errorThrown)
             }
         });
     }
     content()
     //分页代码构成
      var pagss =Number(localStorage.getItem("page"))
     $('.bootstrap-iso #pagination1').jqPaginator({
         totalCounts: recordcount, //设置分页的总条目数
         pageSize: 6,
         visiblePages: 2, //设置最多显示的页码数
         currentPage: pagss?pagss:1, //设置当前的页码
         first: '<li class="first"><a>首页</a></li>',
         prev: '<li class="prev"><a>上一页</a></li>',
         next: '<li class="next"><a>下一页</a></li>',
         last: '<li class="last"><a>末页</a></li>',
         page: '<li class="page"><a>{{page}}</a></li>',
         onPageChange: function(num,type,e) {
           if(type=="change"){
               pageid=num;
               content()
               localStorage.setItem("page",pageid)
               // var pagss =Number(localStorage.getItem("page"))
           }
           else{
               pageid = pagss
               content()
           }
         }
     });
 })