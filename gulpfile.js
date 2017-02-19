const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();


// Some pointless comments for our project.

var devMode = false;

gulp.task('css', function() {
    gulp.src([
            "./src/**/*.css"
        ])
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function() {
    gulp.src([
            "./src/**/*.js"
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('inject', function () {
  var target = gulp.src('./src/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths: 
  var sources = gulp.src([
    "./bower_components/**/*.min.js",
    './src/**/*.js',
    "./bower_components/**/*.min.css",
    './src/**/*.css'
    ], {read: false}
  );
 
  return target.pipe(inject(sources))
    .pipe(gulp.dest('./src'));
});

gulp.task('build', function() {
    gulp.start(['css', 'js', 'html'])
});

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist',
        }
    });
});

gulp.task('start', function() {
    devMode = true;
    gulp.start(['build', 'browser-sync']);
    gulp.watch(['./src/**/*.css'], ['css']);
    gulp.watch(['./src/**/*.js'], ['js']);
    gulp.watch(['./src/**/*.html'], ['html']);
});