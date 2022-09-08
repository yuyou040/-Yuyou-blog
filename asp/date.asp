<%@language="vbscript" codepage="65001"%>
<meta charset="utf8">
<%
dim WeekName(7), MonthAdd(11), NongliData(79), TianGan(9), DiZhi(11), ShuXiang(11), DayName(30), MonName(12)
dim curTime, curYear, curMonth, curDay, curWeekday
dim GongliStr, WeekdayStr, NongliStr, NongliDayStr
dim i, m, n, k, isEnd, bit, TheDate

'星期名
WeekName(0) = "*"
WeekName(1) = "星期日"
WeekName(2) = "星期一"
WeekName(3) = "星期二"
WeekName(4) = "星期三"
WeekName(5) = "星期四"
WeekName(6) = "星期五"
WeekName(7) = "星期六"

'天干名称
TianGan(0) = "甲"
TianGan(1) = "乙"
TianGan(2) = "丙"
TianGan(3) = "丁"
TianGan(4) = "戊"
TianGan(5) = "己"
TianGan(6) = "庚"
TianGan(7) = "辛"
TianGan(8) = "壬"
TianGan(9) = "癸"

'地支名称
DiZhi(0) = "子"
DiZhi(1) = "丑"
DiZhi(2) = "寅"
DiZhi(3) = "卯"
DiZhi(4) = "辰"
DiZhi(5) = "巳"
DiZhi(6) = "午"
DiZhi(7) = "未"
DiZhi(8) = "申"
DiZhi(9) = "酉"
DiZhi(10) = "戌"
DiZhi(11) = "亥"

'属相名称
ShuXiang(0) = "鼠"
ShuXiang(1) = "牛"
ShuXiang(2) = "虎"
ShuXiang(3) = "兔"
ShuXiang(4) = "龙"
ShuXiang(5) = "蛇"
ShuXiang(6) = "马"
ShuXiang(7) = "羊"
ShuXiang(8) = "猴"
ShuXiang(9) = "鸡"
ShuXiang(10) = "狗"
ShuXiang(11) = "猪"

'农历日期名
DayName(0) = "*"
DayName(1) = "初一"
DayName(2) = "初二"
DayName(3) = "初三"
DayName(4) = "初四"
DayName(5) = "初五"
DayName(6) = "初六"
DayName(7) = "初七"
DayName(8) = "初八"
DayName(9) = "初九"
DayName(10) = "初十"
DayName(11) = "十一"
DayName(12) = "十二"
DayName(13) = "十三"
DayName(14) = "十四"
DayName(15) = "十五"
DayName(16) = "十六"
DayName(17) = "十七"
DayName(18) = "十八"
DayName(19) = "十九"
DayName(20) = "二十"
DayName(21) = "廿一"
DayName(22) = "廿二"
DayName(23) = "廿三"
DayName(24) = "廿四"
DayName(25) = "廿五"
DayName(26) = "廿六"
DayName(27) = "廿七"
DayName(28) = "廿八"
DayName(29) = "廿九"
DayName(30) = "三十"

'农历月份名
MonName(0) = "*"
MonName(1) = "正"
MonName(2) = "二"
MonName(3) = "三"
MonName(4) = "四"
MonName(5) = "五"
MonName(6) = "六"
MonName(7) = "七"
MonName(8) = "八"
MonName(9) = "九"
MonName(10) = "十"
MonName(11) = "十一"
MonName(12) = "十二"

'公历每月前面的天数
MonthAdd(0) = 0
MonthAdd(1) = 31
MonthAdd(2) = 59
MonthAdd(3) = 90
MonthAdd(4) = 120
MonthAdd(5) = 151
MonthAdd(6) = 181
MonthAdd(7) = 212
MonthAdd(8) = 243
MonthAdd(9) = 273
MonthAdd(10) = 304
MonthAdd(11) = 334

'农历数据
NongliData(0) = 1706
NongliData(1) = 2773
NongliData(2) = 133557
NongliData(3) = 1206
NongliData(4) = 398510
NongliData(5) = 2638
NongliData(6) = 3366
NongliData(7) = 335142
NongliData(8) = 3411
NongliData(9) = 1450
NongliData(10) = 200042
NongliData(11) = 2413
NongliData(12) = 723293
NongliData(13) = 1197
NongliData(14) = 2637
NongliData(15) = 399947
NongliData(16) = 3365
NongliData(17) = 3410
NongliData(18) = 334676
NongliData(19) = 2906
NongliData(20) = 1389
NongliData(21) = 133467
NongliData(22) = 1179
NongliData(23) = 464023
NongliData(24) = 2635
NongliData(25) = 2725
NongliData(26) = 333477
NongliData(27) = 1746
NongliData(28) = 2778
NongliData(29) = 199350
NongliData(30) = 2359
NongliData(31) = 526639
NongliData(32) = 1175
NongliData(33) = 1611
NongliData(34) = 396618
NongliData(35) = 3749
NongliData(36) = 1706
NongliData(37) = 267628
NongliData(38) = 2734
NongliData(39) = 2350
NongliData(40) = 203054
NongliData(41) = 3222
NongliData(42) = 465557
NongliData(43) = 3402
NongliData(44) = 3493
NongliData(45) = 330581
NongliData(46) = 1386
NongliData(47) = 2669
NongliData(48) = 264797
NongliData(49) = 1325
NongliData(50) = 529707
NongliData(51) = 2709
NongliData(52) = 2890
NongliData(53) = 399018
NongliData(54) = 2773
NongliData(55) = 1370
NongliData(56) = 267450
NongliData(57) = 2651
NongliData(58) = 1323
NongliData(59) = 202023
NongliData(60) = 1683
NongliData(61) = 462419
NongliData(62) = 1706
NongliData(63) = 2773
NongliData(64) = 330165
NongliData(65) = 1206
NongliData(66) = 2647
NongliData(67) = 264782
NongliData(68) = 3350
NongliData(69) = 531750
NongliData(70) = 3410
NongliData(71) = 3498
NongliData(72) = 396650
NongliData(73) = 1389
NongliData(74) = 1198
NongliData(75) = 267421
NongliData(76) = 2605
NongliData(77) = 3349
NongliData(78) = 138021
NongliData(79) = 3410

'获取当前系统时间
curTime = Now()

'生成当前公历年、月、日 ==> GongliStr
curYear = Year(curTime)
curMonth = Month(curTime)
curDay = Day(curTime)

GongliStr = curYear&"年"
If (curMonth < 10) Then
GongliStr = GongliStr&"0"&curMonth&"月"
Else
GongliStr = GongliStr&curMonth&"月"
End If
If (curDay < 10) Then
GongliStr = GongliStr&"0"&curDay&"日"
Else
GongliStr = GongliStr&curDay&"日"
End If

'生成当前公历星期 ==> WeekdayStr
curWeekday = Weekday(curTime)
WeekdayStr = WeekName(curWeekday)

'计算到初始时间2021年2月12日至2101年1月28的天数：2021-2-12(正月初一)，2101-1-28(腊月二十九)
TheDate = (curYear - 2021) * 365 + Int((curYear - 2021) / 4) + curDay + MonthAdd(curMonth - 1) - 42
If ((curYear Mod 4) = 0 AND curMonth > 2) Then
TheDate = TheDate + 1
End If

'计算农历天干、地支、月、日
isEnd = 0
m = 0

Do
If (NongliData(m) < 4095) Then
k = 11
Else
k = 12
End if

n = k
Do
If (n < 0) Then
Exit Do
End If

'获取NongliData(m)的第n个二进制位的值
bit = NongliData(m)
For i = 1 To n Step 1
bit = Int(bit / 2)
Next
bit = bit Mod 2

If (TheDate <= 29 + bit) Then
isEnd = 1
Exit Do
End If

TheDate = TheDate - 29 - bit

n = n - 1
Loop

If (isEnd = 1) Then
Exit Do
End If

m = m + 1
Loop

curYear = 2021 + m
curMonth = k - n + 1
curDay = TheDate

If (k = 12) Then
If (curMonth = (Int(NongliData(m) / 65536) + 1)) Then
curMonth = 1 - curMonth
ElseIf (curMonth > (Int(NongliData(m) / 65536) + 1)) Then
curMonth = curMonth - 1
End if

End If

'生成农历天干、地支、属相 ==> NongliStr
NongliStr = "农历 "&TianGan(((curYear - 4) Mod 60) Mod 10)&DiZhi(((curYear - 4) Mod 60) Mod 12)&"年"
NongliStr = NongliStr&"("&ShuXiang(((curYear - 4) Mod 60) Mod 12)&")"

'生成农历月、日 ==> NongliDayStr
If (curMonth < 1) Then
NongliDayStr = "闰"&MonName(-1 * curMonth)
Else
NongliDayStr = MonName(curMonth)
End If
NongliDayStr = NongliDayStr&"月"

NongliDayStr = NongliDayStr&DayName(curDay)

response.Write GongliStr
response.Write WeekdayStr
response.Write NongliStr
response.Write NongliDayStr
%>

<%
'以上是ASP源码！
'以下是调用代码!
%>

<!-- <%=GongliStr%>　　
<%=WeekdayStr%>　
<%=NongliStr%>　
<%=NongliDayStr%> -->