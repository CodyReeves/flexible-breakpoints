/*---------------------------------------------------------
 Gulp Dependencies
 --------------------------------------------------------*/

var gulp = require('gulp'),
    sass = require('gulp-sass' ),
    concat = require('gulp-concat'),
    minify = require('gulp-minify'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    plumberNotifier = require('gulp-plumber-notifier'),
    stripCssComments = require('gulp-strip-css-comments'),
    cleanCSS = require('gulp-clean-css'),
    uncss = require('gulp-uncss'),
    runSequence = require('run-sequence'),
    uglify = require('gulp-uglify'),
    imageop = require('gulp-image-optimization'),
    svgmin = require('gulp-svgmin');

/*---------------------------------------------------------
 Required paths for Gulp
 --------------------------------------------------------*/

var paths = {
      scss: {
        src: './scss/**/*.scss',
        dest: './assets/css/',
        file: './scss/main.scss'
      },
      css: {
        src: './assets/css/*.css',
        dest: './assets/css/',
        file: 'style.css'
      },
      ie: {
        src: './scss/ie.scss',
        dest: './assets/css/',
        file: 'ie.css'
      },
      js: {
        src: './assets/js/src/*.js',
        dest: './assets/js',
        file: 'compiled.js'
      },
      img: {
        src: ['assets/img/*.png','assets/img/*.jpg','assets/img/*.gif','assets/img/*.jpeg'],
        svg: './assets/img/svg/*.svg',
        dest: './assets/img/min/'
      },
    };

/*---------------------------------------------------------
 CSS/SCSS Tasks
 --------------------------------------------------------*/

/* Configures all tasks to automate
----------------------------------*/
gulp.task( 'watch', function() {
    gulp.watch( paths.scss.src , [ 'sass' ]);
    gulp.watch( paths.ie.src , [ 'sass-ie' ]);
    gulp.watch( paths.css.src , [ 'clean' ]);
    gulp.watch( paths.js.src , [ 'js-compile' ]);
});

/* Compiles all sass linking to prartials in source dir, concats, creates source map, and outputs
----------------------------------*/
gulp.task( 'sass', function() {
    return gulp.src( paths.scss.file )
        .pipe(plumberNotifier())
        .pipe(sourcemaps.init())
        .pipe( sass({ errLogToConsole: true }) )
        .pipe( concat( paths.css.file ) )
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('./maps'))
        .pipe( gulp.dest( paths.scss.dest ));
});

/* Compiles the ie scss sheet in source dir, concats, creates source map, and outputs
----------------------------------*/
gulp.task( 'sass-ie', function() {
  return gulp.src( paths.ie.src )
      .pipe(plumberNotifier())
      .pipe(sourcemaps.init())
      .pipe( sass({ errLogToConsole: true }) )
      .pipe( concat( paths.ie.file ) )
      .pipe(plumber.stop())
      .pipe(sourcemaps.write('./maps'))
      .pipe( gulp.dest( paths.ie.dest ));
});

/* Cleans CSS Removes comments and minifies stylesheet
----------------------------------*/
gulp.task( 'clean', function() {
    return gulp.src( paths.css.src )
        .pipe(stripCssComments())
        .pipe(gulp.dest( paths.css.dest ));
});

/* Removes unused classes within stylesheet
----------------------------------*/
gulp.task( 'remove', function() {
    return gulp.src( paths.css.src )
        .pipe(uncss({
            html: ['']
        }))
        .pipe(gulp.dest( paths.css.dest ));
});

/*---------------------------------------------------------
 JS Tasks
 --------------------------------------------------------*/

 /* Compiles all js files together and minifies
 ----------------------------------*/
gulp.task('js-compile', function(){
    return gulp.src( paths.js.src )
        .pipe(concat( paths.js.file ))
        .pipe(uglify())
        .pipe(gulp.dest( paths.js.dest ))
});

/*---------------------------------------------------------
 Image Tasks
 --------------------------------------------------------*/

 /* Minify PNG, JPEG, GIF
 ----------------------------------*/

 gulp.task('opt-img', function(cb) {
     gulp.src( paths.img.src ).pipe(imageop({
         optimizationLevel: 5,
         progressive: true,
         interlaced: true
     })).pipe(gulp.dest( paths.img.dest )).on('end', cb).on('error', cb);
 });

 /* Image Task
 ----------------------------------*/

 gulp.task( 'image', function() {
     gulp.start('opt-img');
 });

/*---------------------------------------------------------
 Going Live Tasks -- Pushing to server
 --------------------------------------------------------*/

 /* Complies SCSS
 ----------------------------------*/
gulp.task( 'live-sass', function() {
    return gulp.src( paths.scss.file )
        .pipe( sass({ errLogToConsole: true }) )
        .pipe( concat( paths.css.file ))
        .pipe( gulp.dest( paths.scss.dest ));
});

/* Complies ie.css
----------------------------------*/
gulp.task( 'live-ie', function() {
  return gulp.src( paths.ie.src )
      .pipe( sass({ errLogToConsole: true }) )
      .pipe( concat( paths.ie.file ) )
      .pipe( gulp.dest( paths.ie.dest ));
});

/* Minifies and cleans the CSS
----------------------------------*/
gulp.task( 'minify-css', function(){
  return gulp.src( paths.css.src )
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest( paths.css.dest ))
});

/* Puts tasks into sequence
----------------------------------*/
gulp.task('live', function(callback) {
  runSequence('live-sass',
              'live-ie',
              'clean',
              'minify-css',
              'js-compile',
              callback);
});
