<%@language="vbscript" codepage="65001"%>
<%response.ContentType = "application/json"%>
<!--#include file="json.asp" -->
<%
 	dim conn,rs,action,res,sql
  	set conn=server.createobject("adodb.connection")
 	conn.connectionstring="Provider=Microsoft.ACE.OLEDB.12.0;Data Source="&server.mapPath("../access/frist.accdb")
 	conn.open
 	set rs = server.createobject("adodb.recordset")
 	'打开表
 	sql="select biaoti from biaoqian"
 	action=request.queryString("action")
	rs.open sql,conn,1,3
	'读取数据库
	Set jsonObj=New json
	jsonObj.toResponse=False
	Set json_ret = server.createobject("scripting.dictionary")
	if request.querystring("action")="read" then
	dim myArray()
	dim index
	dim qwe
	index=0
 	redim myArray(rs.recordcount-1) '将数组大小重新定义为数据表行数
 	do while not rs.eof
 	'response.charset="utf8"
 	qwe= rs("biaoti")
 	myArray(index)=qwe
	rs.movenext
	index=index+1
	loop
	json_ret.Add "code","200"
	json_ret.Add "data",myArray
	jsonStr = jsonObj.toJSON(Empty,json_ret,False)
	response.Write jsonStr
	end if
 	'关闭表
 	rs.close 
 	'销毁表对象
 	set rs = nothing
 	'关闭数据库
 	conn.close
 	'销毁对象
 	set conn =nothing
%>