var gulp 	= require('gulp'),
	concat 	= require('gulp-concat'),
	uglify 	= require('gulp-uglify'),
	del 	= require('del'),
	browserSync = require('browser-sync'),
	browserSyncSpa = require('browser-sync-spa'),
	mainBowerFiles = require('main-bower-files'),
	appCssFiles = './src/**/*.css',
	appJsFiles = './src/**/*.js',
	indexFile = './src/index.html';

/**
 * CSS tasks
 */
gulp.task('css:vendor', function(){
	gulp.src(mainBowerFiles(), {read: false})
		.pipe(concat('vendor.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({stream: true}));
})

gulp.task('css:app', function() {
	gulp.src(appCssFiles)
		.pipe(concat('app.css'))
		.pipe(gulp.dest('dist/css'));
});

/**
 * JS tasks
 */
gulp.task('js:vendor', function() {
	gulp.src(mainBowerFiles(), { read: false })
		/*.pipe(uglify().on('error', function(e){
            console.log(e);
        }))*/
		.pipe(concat('vendor.js'))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('js:app', function() {
	gulp.src(appJsFiles)
		.pipe(uglify().on('error', function(e){
            console.log(e);
        }))
		.pipe(concat('app.js'))
		.pipe(gulp.dest('./dist/js'));
});

/**
 * HTML tasks
 */
gulp.task('html', function() {
	return gulp.src(indexFile)
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.reload({stream: true}));
});

/**
 * BUILD tasks
 */
gulp.task('clean', function(cb){
	del([
		'dist/**'
	], cb);
});

gulp.task('css',function() {
	gulp.start(['css:vendor','css:app'])
});

gulp.task('js',function() {
	gulp.start(['js:vendor','js:app'])
});

gulp.task('build',function() {
	gulp.start(['css', 'js', 'html'])
});

gulp.task('browser-sync', function() {
	browserSync.init(null, {
		open: true,
		server: {
			baseDir: 'dist',
		}
	});
});

gulp.task('inject-reload', ['build'], function ()
{
    browserSync.reload();
});

gulp.task('start', function() {
	gulp.start(['build', 'browser-sync']);
	gulp.watch(['./src/**/*.css'], ['inject-reload']);
	gulp.watch(['./src/**/*.js'], ['inject-reload']);
	gulp.watch(['./src/**/*.html'], ['html']);
});