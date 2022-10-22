<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<%
Option Explicit
session.codepage=936
response.charset="gb2312"
Response.LCID = 2052 ' 中国 LCID (使用你当地的LCID).
' 也可以在当前页面声明，或者在全站session声明LCID属性.
%>
<!--#include file="jsonObject.class.asp" -->
<%
dim str_json
dim jsonObj,jsonString,outputObj
set jsonObj = new JSONobject  '//创建对象
'//导入json字符串，结构如图
jsonString =OpenFile("Json_String.txt")  
'//解析开始
jsonObj.parse(jsonString)
 '//打印序列化后的对象
jsonObj.Write() 	
response.Write "<br>" 
'//打印值
Response.Write "网站名称:"&jsonObj.value("SiteName")&"<br>"
Response.Write "网站年龄:" & jsonObj("age") ' 短语法
%>