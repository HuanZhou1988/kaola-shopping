//引入gulp
var gulp = require('gulp');

//引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify'); //压缩工具
var rename = require('gulp-rename');
var connect = require('gulp-connect'); //开启服务器的
var minifycss = require('gulp-minify-css');



//js压缩
gulp.task('minjs', function() {
	//gulp.src => 指定要压缩的目录及文件
	//gulp.dest => 压缩后存放的路径

	gulp.src('js/*.js').pipe(uglify()).pipe(gulp.dest('dist'));
})



//压缩css
gulp.task('mincss', function() {
	gulp.src('css/*.css')
		.pipe(concat('all.css'))
		.pipe(gulp.dest('libs/dist'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist'));
})

//压缩sass
gulp.task('minsass', function() {
	gulp.src('libs/sass/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('libs/dist/css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('libs/dist/css'));;
})


//压缩合并所有的js
gulp.task('mi', function() {
	gulp.src('js/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
})



//只有start不用run,npm start、否则npm run dk,用script来替代一些字符。

gulp.task('connect', function() {
	connect.server({
		root: '',
		livereload: true
	});
});



gulp.task('html', function() {
	gulp.src('*.html').pipe(connect.reload());
})

//watch任务
gulp.task('watch', function() {
	gulp.watch(['libs/sass/*.scss'], ['minsass']);
	gulp.watch(['libs/dist/css/*.css'], ['html']);
	gulp.watch(['libs/dist/js/*.js'], ['html']);
	gulp.watch(['*.html'], ['html']);
})


gulp.task('default', function() {
	gulp.run('watch', 'connect', 'minsass');
})