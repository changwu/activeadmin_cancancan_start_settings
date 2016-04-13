var gulp = require('gulp');
// sass
var sass      = require('gulp-ruby-sass');
// ファイルをまとめる
var concat = require('gulp-concat');
// prefixを自動追記
var prefixer = require('gulp-autoprefixer');
// css圧縮
var minifycss = require('gulp-minify-css');
// js圧縮
var uglify = require('gulp-uglify');
// 画像圧縮
var imagemin = require('gulp-imagemin');
// エラーによる監視の強制停止を回避
var plumber = require('gulp-plumber');
// デスクトップにエラーメッセージを表示する
var notify  = require('gulp-notify');
// css spriteを作成
var spritesmith = require('gulp.spritesmith');
// JSリント
var jshint = require('gulp-jshint');
// ファイル名を変更
var rename = require('gulp-rename');
// EJS本体
var ejs = require("gulp-ejs");
// 自動更新
var browserSync = require('browser-sync');
var bs = require("browser-sync").create();
var reload = browserSync.reload;

gulp.task('serve', function () {
  bs.init( {
      port: 8080,
      // browser: ["google chrome", "firefox"],
      // browser: 'Google Chrome Canary',
      // browser: 'firefox',
      browser: "google chrome",
      server:{
          baseDir: ["dist"]
      },
      notify: false
  });
});

// Reload all Browsers
gulp.task('bs-reload', function () {
    bs.reload();
});

// css spriteを作成
gulp.task('sprite', function generateSpritesheets () {
  // Use all normal and `-2x` (retina) images as `src`
  //   e.g. `github.png`, `github-2x.png`
  var spriteData = gulp.src('htdocs/sprite/**/*.png')
    .pipe(spritesmith({

      // Filter out `-2x` (retina) images to separate spritesheet
      //   e.g. `github-2x.png`, `twitter-2x.png`
      // retinaSrcFilter: 'htdocs/sprite/**/*-2x.png',
      // Generate a `-2x` (retina) spritesheet
      // retinaImgName: 'sprite-2x.png',

      // Generate a normal spritesheet
      imgName: 'sprite.png',
      // Generate SCSS variables/mixins for both spritesheets
      cssName: '_sprite.scss',
      // scssに記述されるpath
      imgPath: '/img/sprite.png',
      // 変数のみのSCSSを生成 false
      cssOpts: {
        functions: true
      },
      padding: 10,
      // Mixinから呼び出すためのSpritesheetNameを指定
      cssSpritesheetName: 'aeon-arrow',
      // イメージの並び方
      // algorithm     : 'diagonal',
      // algorithmOpts : {
      //   sort: false
      // }
    }));
  // Deliver spritesheets to `dist/` folder as they are completed
  spriteData.img.pipe(gulp.dest('htdocs/img/'));
  // Deliver CSS to `./` to be imported by `index.scss`
  spriteData.css.pipe(gulp.dest('htdocs/sass/parts/'));
});

// sassで出力 , cssをまとめて圧縮してdistに入れる
gulp.task('sass', function () {
    return sass('htdocs/sass/')
      .pipe(plumber({
          errorHandler: notify.onError('Error: <%= error.message %>')  // デスクトップに通知を出す
      }))
      // .pipe(prefixer('last 3 version'))
      .pipe(prefixer('last 3 version', 'ie >= 8', 'Android 4.0'))
      .pipe(concat('project.css'))
      .pipe(rename({
        extname: '.min.css'
      }))
      .pipe(minifycss())
      .pipe(gulp.dest('dist/css'));
});


// JSリント
gulp.task('lint', function() {
  return gulp.src('htdocs/js/**/*.js')
      .pipe(plumber({
          errorHandler: notify.onError('Error: <%= error.message %>')  // デスクトップに通知を出す
      }))
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
});

// jsをまとめて圧縮してdistに入れる
gulp.task('js', function() {
  return gulp.src('htdocs/js/**/*.js')
      .pipe(plumber({
          errorHandler: notify.onError('Error: <%= error.message %>')  // デスクトップに通知を出す
      }))
      .pipe(uglify())
      .pipe(concat('project.js'))
      .pipe(rename({
        extname: '.min.js'
      }))
      .pipe(gulp.dest('dist/js'));
});

// 画像を圧縮する
gulp.task('img', function () {
  gulp.src('htdocs/img/**/*')
      .pipe(plumber({
          errorHandler: notify.onError('Error: <%= error.message %>')  // デスクトップに通知を出す
      }))
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'));
});

// EJS _(アンダーバー)で始まるejsファイルは参照しない
gulp.task('ejs', function() {
    gulp.src(
        ['html/ejs//*.ejs', '!' + 'html/ejs//_*.ejs']
    )
      .pipe(plumber({
          errorHandler: notify.onError('Error: <%= error.message %>')  // デスクトップに通知を出す
      }))
        .pipe(ejs())
        .pipe(gulp.dest('dist'))
});



// watchする対象を指定
gulp.task('watch', ['serve'], function (){
  // gulp.watch('htdocs/sprite/**/*', ['sprite','sass']);
  gulp.watch('htdocs/sass/**/*', ['sass']);
  // gulp.watch('htdocs/js/**/*', ['lint','js']);
  // gulp.watch('htdocs/img/**/*', ['img']);
  gulp.watch('html/ejs/**/*.ejs', ['ejs']);
  gulp.watch('dist/**/*', ['bs-reload']);
});


// デフォルトで動作するタスク設定
// gulp.task('default', ['sprite', 'sass', 'lint', 'js', 'img', 'serve', 'ejs']);
gulp.task('default', ['sass', 'serve', 'ejs']);