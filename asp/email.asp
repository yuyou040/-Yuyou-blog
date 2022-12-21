<%
function Send_mail(You_Account,You_Password,Send_Email,Send_Email2,Send_Topic,Send_Body,Send_Attachment)
'code by NetPatch
'VBS发送邮件参数说明
'You_Account：你的邮件帐号
'You_Password:你的邮件密码
'Send_Email: 主要邮件地址
'Send_Email2: 备用邮件地址
'Send_Topic: 邮件主题
'Send_Body: 邮件内容
'Send_Attachment:邮件附件

You_ID=Split(You_Account, "@", -1, vbTextCompare) '字符串分隔
'帐号和服务器分离
MS_Space = "http://schemas.microsoft.com/cdo/configuration/"
'这个是必须要的，不过可以放心的事，不会通过微软发送邮件
Set Email = CreateObject("CDO.Message")
Email.From = You_Account
'这个一定要和发送邮件的帐号一样
Email.To = Send_Email '要发给谁

If Send_Email2 <> "" Then
Email.CC = Send_Email2 '备用发给谁
End If

Email.Subject = Send_Topic '邮件主题
Email.Textbody = Send_Body '邮件内容

If Send_Attachment <> "" Then
Email.AddAttachment Send_Attachment '邮件附件
End If

With Email.Configuration.Fields
.Item(MS_Space&"sendusing") = 2 '发信端口
.Item(MS_Space&"smtpserver") = "smtp."&You_ID(1) 'SMTP服务器地址
.Item(MS_Space&"smtpserverport") = 25 'SMTP服务器端口
.Item(MS_Space&"smtpauthenticate") = 1 '服务器认证方式
.Item(MS_Space&"sendusername") = You_Account '你的邮件帐号
.Item(MS_Space&"sendpassword") = You_Password '你的邮件密码
'.Item(schema & "smtpusessl") = True '是否使用SSL
.Item(schema & "smtpconnectiontimeout") = 20
.Update
End With
Email.Send
'发送邮件
Set Email=Nothing
'关闭组件

Send_Mail=True
'如果没有任何错误信息，则表示发送成功,否则发送失败
If Err Then
Err.Clear
Send_Mail=False
End If
End Function
'If Send_Mail("yuyou0402@wo.cn","","yuyou0402@189.cn","","12345","test","")=True Then

'一定要注意 这边的密码不是qq邮箱账号密码，而是qq生成的授权码
MsgBox "Success"
Else
MsgBox "fail"
End If
%>