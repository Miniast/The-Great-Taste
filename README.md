# The Great  Taste - 好味道原型系统

## 安装运行步骤简要说明

1．进入文件夹，执行yarn install

2．运行后端服务器main.py

3．执行yarn dev,在浏览器中打开

4．按照界面设计形式使用

5．在使用过程中若需要初始化数据库，单独运行一次database.py即可

## 运行环境

开发语言：Vue3 + Python

IDE: VSCode + PyCharm

OS: Windows10 Professonal 20H2

数据库：Sqlite

数据库备份导出文件名称：data.db sql.txt

开源框架：naïve-ui, Naïve-ui Admin, Flask, echarts

其它关键技术：TypeScript, Python Sqlite3, Vite2, tailwind.css,

工程名称：好味道原型系统

访问URL：http://localhost:8001/

管理员用户名、密码：admin, administrator

可测试的一个普通用户名、密码：user1,123456789

关键配置文件名称及路径

1）前端为整体商业化架构

2）后端关键路径：back-end/main.py back-end/database.py

3）数据库关键路径：back-end/data.db

## 实现功能

| 编号 | 功能点说明                                                   | 前端关键页面路径  | 工程实现对应代码模块   |
| ---- | ------------------------------------------------------------ | ----------------- | ---------------------- |
| 1    | 用户注册功能；                                               | /register         | Views/login            |
| 2    | 用户登录功能；在首页输入用户名、密码，验证后登录系统；       | /login            | Views/login            |
| 3    | 用户信息管理模块：用户可以浏览自己注册的基本信息，只能修改联系  电话、用户简介和登录密码。 | /dashboard        | Views/dashboard        |
| 4    | “寻味道”信息查询功能模块：默认显示所有请求信息               | /publish/search   | Views/publish/search   |
| 5    | “寻味道”功能模块：默认显示当前自己已发布的所有请求信息；  发布新的请求信息；修改自己已发布未响应请求信息；删除自己已发布未响应请求信息； | /publish/seek     | Views/publish/seek     |
| 6    | “请品鉴”功能模块：默认显示当前所有同地区的“寻味道”信息；提交自己新的“请品尝”响应信息；修改自己已提交未接受的响应信息；删除已提交未接受的响应信息； | /publish/reply    | Views/publish/reply    |
| 7    | 统计分析功能模块：输入起始年月、终止年月、某个地域等查询条件，查询结果以列表方式  显示起始年月、终止年月、某个地域不同类型请求达成中介费的明细；并按月以折线图的方式展示每月累计成交单数、中介费金额的变化趋势；可默认显示某地区近三个月的统计结果。 | /publish/analysis | Views/publish/analysis |

**前端运行界面**

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image002.jpg)

 

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image006.jpg)

 

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image008.jpg)

 

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image010.jpg)

注：简介可正常显示，图中暂未配置

 

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image012.jpg)

 

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image014.jpg)

 

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image016.jpg)

 

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image018.jpg)

 

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image020.jpg)

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image022.jpg)

**后端模式**

Flask – API架构，运行在默认5000端口上

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image024.jpg)

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image026.jpg)

使用flask-cors实现跨域代理

**数据库结构**

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image028.jpg)**user**

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image030.jpg)

**request**

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image032.jpg)

**reply**

![img](file:///C:/Users/12944/AppData/Local/Temp/msohtmlclip1/01/clip_image034.jpg)

