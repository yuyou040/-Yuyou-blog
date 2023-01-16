<!--#include file="jwt.asp" -->
<%
Dim sKey, dAttributes, sToken,newdate
sKey = "Shared Secret"
Set dAttributes=Server.CreateObject("Scripting.Dictionary")
dAttributes.Add "jti", UniqueString
dAttributes.Add "iat", SecsSinceEpoch
dAttributes.Add "exp", SecsSinceEpoch+86400*7
dAttributes.Add "name", "yuyou"
dAttributes.Add "email", "yuyou0402@wo.cn"
sToken = JWTEncode(dAttributes, sKey)
response.write(sToken)
%>