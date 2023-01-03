<%@language="vbscript" codepage="65001"%>
<%response.ContentType = "application/json"%>
<!--#include file="jsonObject.class.asp" -->
<%
dim str_json,text_Id,objErr,jsonObj,jsonString,outputObj,cn,rs,pageId,guidangyear,delid,class_id,label_id,editid
text_Id = request.querystring("text_Id")
pageId=request.querystring("pageId")
guidangyear=request.querystring("year")
delid=request.querystring("delid")
class_id=request.querystring("class_id")
label_id=request.querystring("label_id")
editid=request.querystring("editid")
'ASP ASPError ASPDescription 属性返回错误的详细描述。当 Server.GetLastError 被调用时，ASPError 对象就会被创建，因此只能通过使用 Server.GetLastError 方法来访问错误信息。ASPError 对象的属性描述如下（所有属性都是可读的）
set objErr=Server.GetLastError()
set jsonObj = new JSONobject  '//创建对象
' 从ADODB.Recordset加载记录集
set cn = server.createobject("adodb.connection")
cn.Open "Provider=Microsoft.ACE.OLEDB.12.0;Data Source="&server.mapPath("../access/frist.accdb")
'分页接口数据构成
if request.querystring("action")="read_content" then
    set rs = server.createobject("adodb.recordset")
    sql="select * from content order by id desc"
    rs.open sql,cn,1,3
    rs.pagesize=6
    rs.absolutepage=pageId
    jsonObj.add "recordcount", rs.recordcount
    jsonObj.LoadRecordSetNum rs,rs.pagesize
end if 
'博客详细内容构成
if request.querystring("read")="blogmessage" then
    set rs = cn.execute("select * from content where id ="& text_Id)
    jsonObj.LoadRecordset rs
end if 
'最近文章接口构成
if request.querystring("articles")="lately" then
set rs = cn.execute("select TOP 4 id,create_date,title from content order by id desc")
    jsonObj.LoadRecordset rs
end if 
'归档接口构成
if request.querystring("guidang")="blog" then
    if guidangyear <> "null" then
       set rs = cn.execute("select id,create_date,title,imgaes from content where create_date like '%"&guidangyear&"%' order by id desc")
       jsonObj.LoadRecordset rs
    else 
       set rs = cn.execute("select id,create_date,title,imgaes from content order by id desc")
       jsonObj.LoadRecordset rs
    end if 
end if 
'后台博客表格数据构成
if request.querystring("admin")="Article" then
set rs = cn.execute("select id,create_date,title,class from content order by id desc")
    jsonObj.LoadRecordset rs
end if  
'分类详情页接口构成
if request.querystring("action")="classify" then
       set rs = server.createobject("adodb.recordset")
       sql="select * from content where class like '%"&class_id&"%' order by id desc"
       rs.open sql,cn,1,3
       jsonObj.add "labelnumber", rs.recordcount
       jsonObj.LoadRecordset rs
end if
'分类详情页接口构成
if request.querystring("action")="label" then
       set rs = server.createobject("adodb.recordset")
       sql="select * from content where label like '%"&label_id&"%' order by id desc"
       rs.open sql,cn,1,3
       jsonObj.add "labelnumber", rs.recordcount
       jsonObj.LoadRecordset rs
end if
'获取编辑内容接口
if request.querystring("action")="edit" then
       set rs = cn.execute("select content from content where id ="& editid)
           jsonObj.LoadRecordset rs
end if

rs.close
cn.close
set rs = nothing
set cn = nothing
jsonObj.defaultPropertyName = "AdminList"
jsonObj.Write()               
set jsonObj=nothing
%>