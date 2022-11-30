 $(function(){
     /* 获取博客详情*/
     function content() {
          var url = 'http://192.168.47.1/myblog/asp/content.asp?action=read_content';
          $.ajax(url, {
              dataType: 'json',
              async: true,
              type: 'get',
              headers: {
                  'Content-Type': undefined
              },
              timeout: 5000,
              success: function(data) {
                  var content = data.AdminList
                  var contentHtml='';
                $.each(content,function(i,value){
                    contentHtml += `
                    <div class="center">
                     <p style="display:none;" class="valueid">${value.id}</p>
						<img  src= ${value.imgaes}/>
						<h2>${value.title}</h2>
						<p>${value.brief}</p>
						<div class="xiaobiao">
						<span>${value.create_date}<a>${value.label}</a></span>
						<a href="#" class="jixuyuedu">继续阅读</a>
						</div>
					</div>
                    `
                    console.log(contentHtml) 
                })
               $(".zuiclass").html(contentHtml)
              },
              error: function(xhr, type, errorThrown) {
                  console.log(errorThrown)
              }
          });
      }
      content()
 })