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

' 从ADODB.Recordset加载记录集
dim cn, rs
set cn = server.createobject("adodb.connection")
cn.Open "Provider=Microsoft.ACE.OLEDB.12.0;Data Source="&server.mapPath("../access/frist.accdb")
'set rs = cn.execute("SELECT * FROM content")
if request.querystring("action")="read_category" then
category_array = Array("'selfwords'","'technology'","'note'","'creation'","'share'","'others'")
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
time_array = Array("'%%2018%%'","'%%2019%%'","'%%2020%%'","'%%2021%%'","'%%2022%%'")
time_array_json = Array("yiba","yijiu","erling","erli","erer")
jsonObj.defaultPropertyName = "yearmonthday"

for q = 0 to ubound(time_array)
	data_string = date_time & time_array(q)
	set rs = cn.execute(data_string)
    jsonObj.add time_array_json(q), rs("Expr1000")
next
jsonObj.Write() 
end if
rs.Close
cn.Close
set rs = Nothing
set cn = Nothing               
set jsonObj=nothing

%>