<%@language="vbscript" codepage="65001"%>
<%response.ContentType = "application/json"%>
<!--#include file="jsonObject.class.asp" -->
<%
dim str_json
dim jsonObj,jsonString,outputObj
set jsonObj = new JSONobject  '//创建对象
if request.querystring("action")="read_content" then
' 从ADODB.Recordset加载记录集
dim cn, rs
set cn = server.createobject("adodb.connection")
cn.Open "Provider=Microsoft.ACE.OLEDB.12.0;Data Source="&server.mapPath("../access/frist.accdb")
set rs = cn.execute("SELECT * FROM content")

jsonObj.LoadRecordset rs

rs.Close
cn.Close
set rs = Nothing
set cn = Nothing
jsonObj.defaultPropertyName = "AdminList"
jsonObj.Write()                 
end if
set jsonObj=nothing

%>