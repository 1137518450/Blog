---
title: python入门—认识基础数据类型和if语句
date: 2020-11-07 16:29:20
permalink: /pages/78b83dcc/
categories:
  - Python
  - Python基础
tags:
  - 
---

# 1、变量和常量

变量： 存储信息的，日后被调用、修改操作
常量： 固定不变的量，字母大写

# 2、变量的命名规则

（1）. 字母数字下划线组成
（2）. 不能以数字开头，不能含有特殊字符和空格
（3）. 不能以保留字命名
（4）. 不能以中文命名 
（5）. 定义的变量名应该有意义
（6）. 驼峰式命、 下划线分割单词
（7）. 变量名区分大小写

# 3、python语句注释

```python
# 单行注释
'''多行注释'''
""" 多行注释 """
```

# 4、python字符串拼接

```python
"abc" + "qwe"
```

# 5、常用文件的扩展名

 扩展名用于区分文件类型
      .txt 记事本文本文件
      .doc word文件
      .xls excel文件
      .ppt PPT文件
      .exe 可执行文件
      .jpg .png .gif .jpeg .bmp 图片
      .gif 动态图片
      .pdf PDF文件
      .avi .rmvb .MP4 .mkv .3gp 视频
      .WMV .MP3 .flue .mid 音频
      .py python文件
      .java java 文件
      .c .h c源码
      .php php文件
      .js javascript 文件
      .py python文件

# 6、基础数据类型：

## (1)、数字

```python
int #（整型）
	#在32位机器上，整数的位数为32位，取值范围为-2**31～2**31-1，即-2147483648～2147483647
    #在64位系统上，整数的位数为64位，取值范围为-2**63～2**63-1，即-9223372036854775808～9223372036854775807
```

## (2)、布尔值

真或假
1 或 0

## (3)、字符串

```python
"hello world" #str
```
## (4)、列表

```python
list #列表：
name_list = ['alex', 'seven', 'eric']
#或
name_list ＝ list(['alex', 'seven', 'eric'])
```
## (5)、元祖

```python
tuple #元组
ages = (11, 22, 33, 44, 55)
#或
ages = tuple((11, 22, 33, 44, 55))
```

## (6)、字典（无序）

```python
dict #字典
person = {"name": "mr.wu", 'age': 18}
#或
person = dict({"name": "mr.wu", 'age': 18})
```

PS：循环，range，continue 和 break

# 7、if...else... #if语句

```python
a=10
b=int(input("b=")) #input输入，输入b值
if a>b: #if如果，意思是如果a<b
    print("a比较大") #TAB缩进或者四个空格缩进，同级语句格式应该保持一致
    print("a比较大")
    print("a比较大")
    print("a比较大")
else: #else否则，这里的意思就是a<=b
    print("NO")
```

# 8、if...elif...elif... #多分支if语句

```python
a=10
b=int(input("b=")) #input输入，输入b值
if a<b: #if如果，意思是如果a<b
    print("a比较大")
elif a==b:
    print("等于")
elif:
    print("b比较大")
```

