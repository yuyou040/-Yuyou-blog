<%@language="vbscript" codepage="65001"%>
<%response.ContentType = "application/json"%>
<!--#include file="jsonObject.class.asp" -->
<%
dim str_json,text_Id,objErr,jsonObj,jsonString,outputObj,cn,rs
text_Id = request.querystring("text_Id")
'ASP ASPError ASPDescription 属性返回错误的详细描述。当 Server.GetLastError 被调用时，ASPError 对象就会被创建，因此只能通过使用 Server.GetLastError 方法来访问错误信息。ASPError 对象的属性描述如下（所有属性都是可读的）
set objErr=Server.GetLastError()
set jsonObj = new JSONobject  '//创建对象
' 从ADODB.Recordset加载记录集
set cn = server.createobject("adodb.connection")
cn.Open "Provider=Microsoft.ACE.OLEDB.12.0;Data Source="&server.mapPath("../access/frist.accdb")
if request.querystring("action")="read_content" then
    set rs = server.createobject("adodb.recordset")
    sql="select * from content"
    rs.open sql,cn,1,3
    rs.pagesize=3
    rs.absolutepage=1
    jsonObj.LoadRecordSetNum rs,rs.pagesize
end if 
if request.querystring("read")="blogmessage" then
    set rs = cn.execute("SELECT * FROM content where id ="& text_Id)
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