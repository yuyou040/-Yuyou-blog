<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<%
Option Explicit
session.codepage=936
response.charset="gb2312"
Response.LCID = 2052 ' �й� LCID (ʹ���㵱�ص�LCID).
' Ҳ�����ڵ�ǰҳ��������������ȫվsession����LCID����.
%>
<!--#include file="jsonObject.class.asp" -->
<%
dim str_json
dim jsonObj,jsonString,outputObj
set jsonObj = new JSONobject  '//��������
'//����json�ַ������ṹ��ͼ
jsonString =OpenFile("Json_String.txt")  
'//������ʼ
jsonObj.parse(jsonString)
 '//��ӡ���л���Ķ���
jsonObj.Write() 	
response.Write "<br>" 
'//��ӡֵ
Response.Write "��վ����:"&jsonObj.value("SiteName")&"<br>"
Response.Write "��վ����:" & jsonObj("age") ' ���﷨
%>