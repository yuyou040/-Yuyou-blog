$(function(){
        var year=new URLSearchParams(window.location.hash.split('?')[1]).get('year');
        if(year==null){
            $(".guidangbox h2").text("归档")
        }
        else{
            $(".guidangbox h2").text(year)
        }
        function guidang() {
               var url = 'http://192.168.47.1/myblog/asp/content.asp?guidang=blog&year='+year;
               $.ajax(url, {
                   dataType: 'json',
                   async: false,
                   type: 'get',
                   headers: {
                       'Content-Type': undefined
                   },
                   timeout: 5000,
                   success: function(data) {
                       var guidang = data.AdminList
                       var guidangHtml = '';
                       $.each(guidang, function(i, value) {
                           guidangHtml += `
                              <div class="guidangboxlist">
                                  <ul>
                                      <li>
                                          <span style="display:none">${value.id}</span>
                                          <p class="gdtime">${value.create_date}</p>
                                          <p class="gdtitle">${value.title}</p>
                                          <img data-original=${value.imgaes}>
                                      </li>
                                  </ul>
                              </div>
                          `
                       })
                       $("#guidangboxlist").html(guidangHtml)
                       $("img").lazyload();
                   },
                   error: function(xhr, type, errorThrown) {
                       console.log(errorThrown)
                   }
               });
           }
           guidang()
           $(".guidangboxlist").click(function(){
               var text_Id = $(this).children().children().children("span").text()
               window.$router.changeHash("/content?text_Id="+text_Id)
               $(window).scrollTop(0)
           })
})