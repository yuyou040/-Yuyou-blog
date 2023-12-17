<!--#include file="jwt.asp" -->
<!--#include file="jsonObject.class.asp" -->
<%
Dim sKey, dAttributes, sToken,newdate,dtoken,conn,rs,sql,username,password,jsonObj
username=request.querystring("username")
password=request.querystring("password")
code = request.querystring("code")
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
    
if not isempty(code) then
	Dim objHTTP, strURL, strData,accesstoken
	Set objHTTP = CreateObject("MSXML2.ServerXMLHTTP")

	strURL = "https://github.com/login/oauth/access_token"
	strData = "client_id=65de3d1437080ef4cd0a" & _
	           "&client_secret=bd2a8c4352e8c943924e396fa6ffbddfc40db73b" & _
	           "&code="&code
	
	objHTTP.open "POST", strURL, False
	objHTTP.setRequestHeader "accept", "application/json"
	objHTTP.send strData
	If objHTTP.Status = 200 Then
	   response.write "HTTP Status: " & objHTTP.Status
	   response.write objHTTP.responseText
	   jsonObj.Parse(objHTTP.responseText)
	  accesstoken =  jsonObj.Value("access_token")
	  usrURL = "https://api.github.com/user"
	  objHTTP.open "get", usrURL, False
	  objHTTP.setRequestHeader "Authorization","token "&accesstoken
	  objHTTP.send
	  If objHTTP.Status = 200 Then
		response.write "HTTP Status: " & objHTTP.Status
		response.write objHTTP.responseText
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
		jsonObj.Write() 
		response.write jsonObj.Value("token")
		Response.Redirect "http://101.43.93.193/admin/login.html?token="& jsonObj.Value("token")
	  else
		response.write "HTTP Status: " & objHTTP.Status
		response.write "Request failed."
	  end if
	Else
	    response.write "HTTP Status: " & objHTTP.Status
	    response.write "Request failed."
	End If
	
	
	Set objHTTP = Nothing
	set jsonObj=nothing
end if
%>