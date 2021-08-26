# zgulp

其中用到的相关插件安装：
npm install gulp-uglify gulp-concat --save-dev
npm install --save-dev gulp-babel @babel/core @babel/preset-env


使用gulp对cordova项目中www文件夹下的js进行压缩混淆合并处理，以及我在项目中的使用。

我的cordova iOS项目目录：
项目名--项目名.xcodeproj
     |_...
     |_www
     |_www_origin
     
www_orgin目录：
www_origin--html
           |_css
           |_js
           |_resources
           |_...

由于www文件夹中的文件作为跨平台项目的加载对象，对其中的js进行压缩混淆处理，此文件夹仅用作以后的项目打包，日常web开发的部分在www_origin文件夹中进行。
xcode作为原生开发工具和打包工具使用，vscode作为web开发工具。
使用xcode时不导入www_origin文件夹，导入后面生成的www文件，和原生项目同级。使用vscode时全部导入，只修改www_origin的代码，然后使用gulp打包，在原生项目同级目录下生成www文件。

使用gulp打包，大致分了两步：
1.www_origin拷贝一份（js下面的不拷贝，下面一步要写入压缩合并的js文件），作为用于Cordova打包的www文件；
2.取js文件流，将文件流分别做es6转换->压缩->合并->输出到上级目录的www下的js文件夹中，由于cordova的入口为app.js，所以全部压缩为app.js。

