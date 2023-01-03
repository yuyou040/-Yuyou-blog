$(function(){
    UE.delEditor('editor');
    var ue = UE.getEditor('editor');
    function isFocus(e){
        alert(UE.getEditor('editor').isFocus());
        UE.dom.domUtils.preventDefault(e)
    }
    
    var editid=new URLSearchParams(window.location.hash.split('?')[1]).get('editid');
    function edit() {
        var url = 'http://192.168.47.1/myblog/asp/content.asp?action=edit&editid='+editid;
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
               ue.addListener("ready", function () {
                       //赋值
                       ue.setContent(content[0].content);
                       //取值
                       var contents = ue.getContent();
                       //输出测试
               })
            },
            error: function(xhr, type, errorThrown) {
                console.log(errorThrown)
            }
        });
    }
    edit()
})