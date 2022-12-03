<%@language="vbscript" codepage="65001"%>
<%response.ContentType = "application/json"%>
<!--#include file="jsonObject.class.asp" -->
<%
dim str_json,sql
dim jsonObj,jsonString,outputObj
set jsonObj = new JSONobject  '//创建对象
if request.querystring("action")="read_content" then
' 从ADODB.Recordset加载记录集
dim cn, rs
set cn = server.createobject("adodb.connection")
cn.Open "Provider=Microsoft.ACE.OLEDB.12.0;Data Source="&server.mapPath("../access/frist.accdb")
set rs = server.createobject("adodb.recordset")
sql="select * from content"
'rs.recordcount 总记录数
'rs。pagesize 设置每页显示几条
'set rs = cn.execute("select * from content where ID=1")
rs.open sql,cn,1,3
rs.pagesize=5
rs.absolutepage=2
for i = 1 to rs.pagesize
  'response.Write rs("id")&rs("label")
  jsonObj.LoadRecordset rs
   If rs.eof then exit for
   rs.movenext 
next

'set rs = cn.execute("SELECT TOP 5 * FROM content")
'jsonObj.LoadRecordset rs
rs.Close
cn.Close
set rs = Nothing
set cn = Nothing
jsonObj.defaultPropertyName = "AdminList"
jsonObj.Write()                 
end if
set jsonObj=nothing

%>