<%@language="vbscript" codepage="65001"%>
<%response.ContentType = "application/json"%>
<!--#include file="jsonObject.class.asp" -->
<%

const SQL = "SELECT COUNT(*) FROM content  WHERE class = "
const date_time = "SELECT COUNT(*) FROM content  WHERE create_date like "
dim str_json
dim jsonObj
dim category_array,category_array_json
dim i
dim cate_string
set jsonObj = new JSONobject  '//创建对象
dim years,yearone,yeartwo,yearthree,yearfour,yearfive
years = Year(now())
yearone = "'%%"&years&"%%'"
yeartwo = "'%%"&years-1&"%%'"
yearthree = "'%%"&years-2&"%%'"
yearfour = "'%%"&years-3&"%%'"
yearfive = "'%%"&years-4&"%%'"
' 从ADODB.Recordset加载记录集
dim cn, rs
set cn = server.createobject("adodb.connection")
cn.Open "Provider=Microsoft.ACE.OLEDB.12.0;Data Source="&server.mapPath("../access/frist.accdb")
'set rs = cn.execute("SELECT * FROM content")
if request.querystring("action")="read_category" then
category_array = Array("'自言语'","'技术向'","'笔记本'","'创作集'","'分享'","'编程'")
category_array_json = Array("selfwords","technology","note","creation","share","others")
jsonObj.defaultPropertyName = "Category"
for i = 0 to ubound(category_array)
	cate_string = SQL & category_array(i)
	set rs = cn.execute(cate_string)
    jsonObj.add category_array_json(i), rs("Expr1000")
next
jsonObj.Write() 
end if
if request.querystring("action")="create_date" then
time_array = Array(yearone,yeartwo,yearthree,yearfour,yearfive)
time_array_json = Array("yiba","yijiu","erling","erli","erer")
jsonObj.defaultPropertyName = "yearmonthday"

for q = 0 to ubound(time_array)
	data_string = date_time & time_array(q)
	set rs = cn.execute(data_string)
    jsonObj.add time_array_json(q), rs("Expr1000")
next
jsonObj.Write() 
end if
if request.querystring("action")="head_card" then 
sqlArray = Array("SELECT COUNT(title) FROM content","SELECT COUNT(label) FROM content","SELECT SUM(LEN(content)) FROM content")
sqlArray_json = Array("wenzhang","biaoqian","zishu")
jsonObj.defaultPropertyName = "message"
for z = 0 to ubound(sqlArray)
	set rs = cn.execute(sqlArray(z))
    jsonObj.add sqlArray_json(z), rs("Expr1000")
next
jsonObj.Write() 
end if
rs.Close
cn.Close
set rs = Nothing
set cn = Nothing               
set jsonObj=nothing

%>