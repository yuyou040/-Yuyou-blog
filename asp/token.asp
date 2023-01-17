<!--#include file="jwt.asp" -->
<%
Dim sKey, dAttributes, sToken,newdate,dtoken,conn,rs,sql,username,password
username=request.querystring("username")
password=request.querystring("password")
set conn=server.createobject("adodb.connection")
 	conn.connectionstring="Provider=Microsoft.ACE.OLEDB.12.0;Data Source="&server.mapPath("../access/frist.accdb")
 	conn.open
    set rs = server.createobject("adodb.recordset")
     sql="select * from loginusers"
     rs.open sql,conn,1,1
     if rs("loginname")=username and rs("password")=password then
     sKey = "Shared Secret"
     Set dAttributes=Server.CreateObject("Scripting.Dictionary")
     dAttributes.Add "jti", UniqueString
     dAttributes.Add "iat", SecsSinceEpoch
     dAttributes.Add "exp", SecsSinceEpoch+86400*7
     dAttributes.Add "name", "yuyou"
     dAttributes.Add "email", "yuyou0402@wo.cn"
     sToken = JWTEncode(dAttributes, sKey)
     response.write(sToken)
    else
     response.write(404)
    end if
    set rs=nothing
    set cn = nothing
%>