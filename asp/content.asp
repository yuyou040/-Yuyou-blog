<%@language="vbscript" codepage="65001"%>
<%response.ContentType = "application/json"%>
<!--#include file="jsonObject.class.asp" -->
<%
dim str_json,text_Id,objErr,jsonObj,jsonString,outputObj
text_Id = request.querystring("text_Id")
'ASP ASPError ASPDescription 属性返回错误的详细描述。当 Server.GetLastError 被调用时，ASPError 对象就会被创建，因此只能通过使用 Server.GetLastError 方法来访问错误信息。ASPError 对象的属性描述如下（所有属性都是可读的）
set objErr=Server.GetLastError()
set jsonObj = new JSONobject  '//创建对象
' 从ADODB.Recordset加载记录集
dim cn, rs
set cn = server.createobject("adodb.connection")
cn.Open "Provider=Microsoft.ACE.OLEDB.12.0;Data Source="&server.mapPath("../access/frist.accdb")
if request.querystring("action")="read_content" then
set rs = cn.execute("SELECT * FROM content")
end if 
if request.querystring("read")="blogmessage" then
set rs = cn.execute("SELECT * FROM content where id ="& text_Id)
end if 
jsonObj.LoadRecordset rs
rs.Close
cn.Close
set rs = Nothing
set cn = Nothing
jsonObj.defaultPropertyName = "AdminList"
jsonObj.Write()               
set jsonObj=nothing
%>