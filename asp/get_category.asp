<%@language="vbscript" codepage="65001"%>
<%response.ContentType = "application/json"%>
<!--#include file="jsonObject.class.asp" -->
<%

const SQL = "SELECT COUNT(*) FROM content WHERE class = "

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

category_array = Array("'selfwords'","'technology'","'note'","'creation'","'share'","'others'")
category_array_json = Array("selfwords","technology","note","creation","share","others")
jsonObj.defaultPropertyName = "Category"

for i = 0 to ubound(category_array)
	cate_string = SQL & category_array(i)
	''response.Write cate_string
	set rs = cn.execute(cate_string)
    jsonObj.add category_array_json(i), rs("Expr1000")
next
jsonObj.Write() 

rs.Close
cn.Close
set rs = Nothing
set cn = Nothing               
set jsonObj=nothing

%>