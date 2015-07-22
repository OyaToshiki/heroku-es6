var gulp = require('gulp');

var babel = require('gulp-babel');

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');


var src = './src';
var dest = './dist';


gulp.task('build', ['app', 'server', 'public']);


gulp.task('app', function() {
  return gulp.src(src + '/app.js')
    .pipe(babel())
    .pipe(gulp.dest(dest));
});


gulp.task('server', ['server:routes', 'server:views']);

gulp.task('server:routes', function() {
  return gulp.src(src + '/routes/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest(dest + '/routes'));
});

gulp.task('server:views', function() {
  return gulp.src(src + '/views/**/*.jade')
    .pipe(gulp.dest(dest + '/views'));
});


gulp.task('public', ['public:images', 'public:javascripts', 'public:stylesheets']);

gulp.task('public:images', function() {
  return gulp.src(src + '/public/images/**/*')
    .pipe(gulp.dest(dest + '/public/images'));
});

gulp.task('public:javascripts', function() {
  var compile = function() {
    var bundler = browserify(
      src + '/public/javascripts/bundle.js',
      {
        debug: true,
        transform: ['babelify']
      }
    );

    var bundle = function() {
      return bundler
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulp.dest(dest + '/public/javascripts'));
    }

    bundler.on('update', bundle);

    return bundle();
  };

  return compile();
});

gulp.task('public:stylesheets', function() {
  return gulp.src(src + '/public/stylesheets/**/*.css')
    .pipe(gulp.dest(dest + '/public/stylesheets'));
});
