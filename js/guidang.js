$(function(){
        var year=new URLSearchParams(window.location.hash.split('?')[1]).get('year');
        if(year==null){
            $(".guidangbox h1").text("归档")
        }
        else{
            $(".guidangbox h1").text(year)
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
                                          <img src=${value.imgaes}>
                                      </li>
                                  </ul>
                              </div>
                          `
                       })
                       $("#guidangboxlist").html(guidangHtml)
                   },
                   error: function(xhr, type, errorThrown) {
                       console.log(errorThrown)
                   }
               });
           }
           guidang()
           // $(".guidangboxlist").on("click", ".gdtitle", function(){
           //     alert(1)
           //     // var text_Id = $(this).children('.valueid').text()
           //    // window.$router.changeHash("/content?text_Id="+text_Id)
           //    // $(window).scrollTop(0)
           // });
           $(".gdtitle").click(function(){
               var text_Id = $(this).siblings("span").text()
               window.$router.changeHash("/content?text_Id="+text_Id)
               $(window).scrollTop(0)
           })
})