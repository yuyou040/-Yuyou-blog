<!--#include file="./easyasp/easp.asp" -->
<%
dim File,cn,rs,sql
Easp.Var("test1") = "test1"
Easp.Upload.AllowFileTypes = "*.jpg"
Easp.Upload.AllowMaxFileSize = "10MB"
Easp.Upload.AllowMaxSize = "20mb"
Easp.Upload.CharSet = "utf-8"
Easp.Println "Easp.Var(""form1"") => " & Easp.Var("form1")  '在调用 Easp.Upload.GetData() 之前是取不到表单数据的
Easp.Println "Easp.Var(""act"") => " & Easp.Var("act") 'querystring的值则可以随时调用
Easp.Println "Easp.Var(""test1"") => " & Easp.Var("test1")
if not Easp.Upload.GetData() then 
	Easp.Println Easp.Upload.Description
else
  Easp.Var("test2") = "test2"
	Easp.Upload.SavePath = "../img"
	Easp.Println "Easp.Var(""test2"") => " & Easp.Var("test2")
	Easp.Println "Easp.Post(""form1"") => " & Easp.Post("form1")
	Easp.Println "Easp.Db.ToSql(""delete from T where Tname in ({(form1)})"") =>" & _
	             Easp.Db.ToSql("delete from T where Tname in ({(form1)})")
	Set File = Easp.Upload.Save("file1",0,true)
	if File.Succeed then
    set cn = server.createobject("adodb.connection")
    cn.Open "Provider=Microsoft.ACE.OLEDB.12.0;Data Source="&server.mapPath("../access/frist.accdb")
    set rs = server.createobject("adodb.recordset")
    sql="select * from content"
    rs.open sql,cn,1,3
		Easp.Println "文件'" & File.LocalName & "'上传成功，保存位置'" & File.Path & File.FileName & "',文件大小" & File.Size & "字节"
    rs.addnew()
    rs("title") = Easp.Post("title")
    rs("class") = Easp.Post("fenlei")
    rs("brief") = Easp.Post("jianjie")
    rs("label") = Easp.Post("biaoqian")
    rs("create_date") = date()
    rs("imgaes") = "img/"& File.FileName &"#http://img/"&File.FileName
    rs.update
    rs.close
    cn.close
    set rs = nothing
    set cn = nothing
	else
		Easp.Println File.Exception & "<br />"
	end if
end if
%>