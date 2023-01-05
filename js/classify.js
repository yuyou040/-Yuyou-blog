$(function(){
    var classify = new URLSearchParams(window.location.hash.split('?')[1]).get('class_id');
    
    function neirong() {
        var url = 'http://192.168.47.1/myblog/asp/content.asp?action=classify&class_id='+classify;
      $.ajax(url, {
          dataType: 'json',
          async: false,
          type: 'get',
          headers: {
              'Content-Type': undefined
          },
          timeout: 5000,
          success: function(data) {
              $(".classnumber").text(data.labelnumber)
              $(".fenlei").text(classify)
              recordcount = data.recordcount
              localStorage.setItem("recordcounts", "recordcount")
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
    neirong()
})