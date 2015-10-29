var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var browserSync = require('browser-sync').create();
var del = require('del');

var paths = {
  html: ['./index.html'],
  styles: ['./styles/**/*.css']
};

function compile(watch) {
  var bundler = watchify(browserify('./scripts/main.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build'))
      .pipe(browserSync.reload({stream: true}));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function watch() {
  compile(true);

  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.html, ['html']);

  browserSync.init({
      server: "./build"
  });
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('clean:html', function() {
  return del(['./build/index.html']);
});
gulp.task('clean:styles', function() {
  return del(['./build/styles/**/*']);
});

gulp.task('html', ['clean:html'], function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('./build'))
    .pipe(browserSync.reload({stream: true}));;
});

gulp.task('styles', ['clean:styles'], function() {
  return gulp.src(paths.styles)
    .pipe(gulp.dest('./build/styles'))
    .pipe(browserSync.reload({stream: true}));;
});

gulp.task('default', ['html', 'styles'], function() {
  watch();
});
