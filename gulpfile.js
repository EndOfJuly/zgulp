
/**
 * 引入模块
 * gulp 为基础模块
 * gulp-uglify 是js压缩混淆插件，由于该插件无法压缩es6，使用下面的插件将es6转为es5
 * gulp-babel 将es6转为es5
 * gulp-concat 将js合并
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat');
    
// 用于顺序执行任务
const { series } = require('gulp');

// gulp项目的统计目录www_origin中的文件作为开发的源文件
// www_origin拷贝一份（js下面的不拷贝，下面一步要写入压缩合并的js文件），作为用于Cordova打包的www文件
function copyfile() {
    return gulp.src(['../www_origin/**', '!../www_origin/js/**'])
            .pipe(gulp.dest('../www/'));
}

// 取js文件流，将文件流分别做es6转换->压缩->合并->输出到上级目录的www下的js文件夹中，由于cordova的入口为app.js，所以全部压缩为app.js
function minjs() {
    return gulp.src(['../www_origin/js/**/*.js'])
        .pipe(babel({
            presets: ["@babel/env"],
            plugins: []
        }))
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('../www/js/'));
}

// 顺序执行上面copyfile、minjs两步操作
exports.start = series(copyfile, minjs);
