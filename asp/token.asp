<!--#include file="jwt.asp" -->
<!--#include file="jsonObject.class.asp" -->
<%
Dim sKey, dAttributes, sToken,newdate,dtoken,conn,rs,sql,username,password,jsonObj
username=request.querystring("username")
password=request.querystring("password")
set jsonObj = new JSONobject
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
     dAttributes.Add "exp", SecsSinceEpoch+86400*2
     dAttributes.Add "name", "yuyou"
     dAttributes.Add "email", "yuyou0402@wo.cn"
     sToken = JWTEncode(dAttributes, sKey)
     jsonObj.Add "code", 200
     jsonObj.Add "token", sToken
     jsonObj.defaultPropertyName = "AdminList"
    else
     jsonObj.Add "code", 401
    end if
    set rs=nothing
    set cn = nothing
    jsonObj.defaultPropertyName = "AdminList"
    jsonObj.Write()               
    set jsonObj=nothing
%>