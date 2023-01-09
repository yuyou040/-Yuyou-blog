<%@language="vbscript" codepage="65001"%>
<%response.ContentType = "application/json"%>
<%
 	dim conn,rs,sql,delid,upid
    delid=request.querystring("delid")
  	set conn=server.createobject("adodb.connection")
 	conn.connectionstring="Provider=Microsoft.ACE.OLEDB.12.0;Data Source="&server.mapPath("../access/frist.accdb")
 	conn.open
    upid=request.querystring("upid")
    content=request.form("content")
    response.write(content)
 	'打开表
	'读取数据库
	if request.querystring("action")="delete" then
	        set rs = server.createobject("adodb.recordset")
	        sql="delete from content where id ="&delid&""
	        rs.open sql,conn,1,3
            set rs = nothing
            conn.close
            set conn =nothing
	end if
    if request.querystring("action")="upload" then
     set rs = server.createobject("adodb.recordset")
     sql="select * from content where id ="&upid
     rs.open sql,conn,1,3
     rs("content")=content
     rs.update
     rs.close
    set rs=nothing
    set cn = nothing
    end if
%>