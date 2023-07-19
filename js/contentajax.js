 $(function() {
            var contentid = new URLSearchParams(window.location.hash.split('?')[1]).get('text_Id');
            function neirong() {
                var url = 'http://101.43.93.193/asp/content.asp?read=blogmessage&text_Id=' + contentid;
                $.ajax(url, {
                    dataType: 'json',
                    async: false,
                    type: 'get',
                    headers: {
                        'Content-Type': undefined
                    },
                    timeout: 5000,
                    success: function(data) {
                        var neirong = data.AdminList
                        var neirongHtml = '';
                        $.each(neirong, function(i, value) {
                            neirongHtml += `
                                <div class="zuiclass">
                                <img class="zuiclassimg" src="${value.imgaes}" />
                                <div class="neirong">
                                    <h2>${value.title}</h2>
                                    <span>${value.create_date}<a>${value.label}</a></span>
                                    <p>${value.content}</p>
                                </div>
                                </div>
                           `
                        })
                        $("#center").html(neirongHtml)
                    },
                    error: function(xhr, type, errorThrown) {
                        console.log(errorThrown)
                    }
                });
            }
            neirong()
            // window.changyan.api.config({
            //     appid: 'cywgyEgGi',
            //     conf: 'prod_41b23efdb9b6c51afa4be07f6c94aa95'
            // });
            
        })