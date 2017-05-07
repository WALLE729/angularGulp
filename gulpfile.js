/**
 * Created by walle on 2017/05/07.
 */
var gulp         = require("gulp");
var sass         = require("gulp-ruby-sass");
var less         = require("gulp-less");
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var rename       = require('gulp-rename');
var notify       = require('gulp-notify');
var browserSync  = require("browser-sync").create();
var browserify   = require("gulp-browserify");
var reload       = browserSync.reload;

var dev          = 'webDev/';
var static       = 'static/dest/';
var htmlWatch    = 'static/';
var serverPath   = './static/';
var port         = '8000';
    
    gulp.task('less', function() {
        gulp.src(dev + '**/*.less')
            .pipe(less({style: "expanded"}))
            .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(rename({suffix: '.min'}))
            .pipe(minifycss())
            .pipe(gulp.dest(static))
            .pipe(notify({ message: 'Styles task complete' }))
            .pipe(browserSync.stream());
    });

    gulp.task('js', function () {
        return gulp.src(dev + '**/*.js')
            // .pipe(browserify())
            .pipe(uglify({
                mangle: false,//类型：Boolean 默认：true 是否修改变量名
                compress: true//类型：Boolean 默认：true 是否完全压缩
            }))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(static))
            .pipe(browserSync.stream());
    });

    gulp.task('serve', ['less', 'js'], function() {
        browserSync.init({
            port:port,
            server: serverPath
        });

        gulp.watch(dev + 'css/**/*.less', ['less']);
        gulp.watch(htmlWatch + "**/*.html").on('change',reload);
        gulp.watch(dev + 'js/**/*.js', ['js'])
    });

    gulp.task('walle', ['serve']);