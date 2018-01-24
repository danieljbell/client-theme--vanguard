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
    // cssnano
  ];
  gulp.src('_src/application/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.stream());
  gulp.src(['_src/client/_client_variables.scss', '_src/client/client-theme.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./_includes'))
    .pipe(gulp.dest('./css'))
    //.pipe(browserSync.stream());  
  gulp.src('_src/client/theme-builder.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./css'))
    .pipe(gulp.dest('_site/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  gulp.src('_src/application/application.js')
    .pipe(gulp.dest('./js'))
  gulp.src('node_modules/clipboard/dist/clipboard.min.js')
    .pipe(gulp.dest('./js/libs'))
});


gulp.task('watch', function() {
  gulp.watch('_src/**/*.scss', ['css']);
  gulp.watch('_src/**/*.js', ['js']).on('change', reload);
  gulp.watch('**/*.html').on('change', reload);
});


gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: 'localhost:4000',
        port: 3000
    });
});


gulp.task('default', ['css', 'js', 'browser-sync', 'watch']);