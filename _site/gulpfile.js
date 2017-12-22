var gulp          = require('gulp'),
    postcss       = require('gulp-postcss'),
    sass          = require('gulp-sass'),
    sourcemaps    = require('gulp-sourcemaps'),
    atImport      = require('postcss-import'),
    autoprefixer  = require('autoprefixer'),
    mqpacker      = require('css-mqpacker'),
    cssnano       = require('cssnano'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    pump          = require('pump'),
    browserSync   = require('browser-sync').create(),
    reload        = browserSync.reload;

gulp.task('css', function () {
  var processors = [
    atImport,
    autoprefixer({browsers: ['last 6 versions']}),
    mqpacker,
    cssnano
  ];
  return gulp.src('_src/application/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.stream());
});


gulp.task('watch', function() {
  gulp.watch('_src/**/*.scss', ['css']);
  gulp.watch('**/*.html').on('change', reload);
});


gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'localhost:4000',
        port: 3000
    });
});


gulp.task('default', ['css', 'browser-sync', 'watch']);