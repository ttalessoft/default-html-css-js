// adiciona modulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');


function compilaSass() {
  return gulp
    .src('css/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}
gulp.task('sass', compilaSass);


// agrupa todos os js, concatena, converte, comprime e exporta
function gulpJs() {
  return gulp
    .src('js/main/*.js')
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

gulp.task('mainjs', gulpJs);

// css plugins
function pluginCss() {
  return gulp
    .src([
      'node_modules/bootstrap/dist/css/bootstrap-grid.min.css',
      'node_modules/bootstrap/dist/css/bootstrap-reboot.min.css',
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css',
      'node_modules/font-awesome/css/font-awesome.min.css'
    ])
    .pipe(concat('plugins.css'))
    .pipe(uglifycss({
      'uglyComments': true
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}

gulp.task('plugincss', pluginCss);


// js plugins
function pluginJs() {
  return gulp
    .src([
      'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
      'node_modules/bootstrap/dist/js/bootstrap.min.js',
      'node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js',
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/moment/min/moment-with-locales.min.js'
    ])
    .pipe(concat('plugins.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

gulp.task('pluginjs', pluginJs);

function browser() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
}

gulp.task('browser-sync', browser);

function watch() {
  gulp.watch('css/scss/**/*.scss', compilaSass);
  gulp.watch(['js/main/*.js', '!js/main.js'], gulpJs);
  gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
}

gulp.task('watch', watch);

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs', 'pluginjs', 'plugincss'));