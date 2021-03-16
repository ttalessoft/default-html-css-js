// adiciona modulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


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

// js plugins
function pluginJs() {
  return gulp
    .src([
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
  gulp.watch('css/scss/*.scss', compilaSass);
  gulp.watch(['js/main/*.js', '!js/main.js'], gulpJs);
  gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
}

gulp.task('watch', watch);

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs', 'pluginjs'));