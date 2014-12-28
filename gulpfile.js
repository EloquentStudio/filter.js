var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  changed = require('gulp-changed'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  download = require("gulp-download"),
  del = require('del'),
  header = require('gulp-header'),
  runSequence = require('run-sequence'),
  rename = require('gulp-rename'),
  browserSync = require('browser-sync'),
  injector = require('gulp-injector');

var pkg = require('./package.json'),
    paths = {
      remote_scripts: [ 
        'https://raw.githubusercontent.com/jiren/JsonQuery/master/json_query.js',
    ],
    lib: 'lib/*.js',
    src: 'src/*.js',
    views: 'src/views/*.html',
    scripts: [ 'lib/json_query.js', 'src/main.js'],
    dist: 'dist'
  },
  uncompressedJs = 'filter.js',
  compressedJs = 'filter.min.js';


var banner = [
   '/*',
   ' * <%= pkg.title || pkg.name %>',
   ' * <%= pkg.version %> (<%= new Date().toISOString().slice(0, 10) %>)',
   ' *',
   ' * Released under the MIT license',
   ' * http://opensource.org/licenses/MIT',
   ' *',
   ' * Copyright 2011-<%= new Date().getFullYear() %> <%= pkg.author.name %>[<%= pkg.author.email %>]',
   ' *',
   ' * Dependency:',
   ' *  jQuery(v1.9 >=)',
   ' */',
   ' ',
   ' ' ].join('\n');

gulp.task('clean', function(cb) {
  del([paths.dist], cb);
});

gulp.task('remote_scripts', function(){
  var files = paths.remote_scripts;

  for(var i = 0, l = files; i < l; i++){
    download(files[i]).pipe(gulp.dest(paths.lib));
  }
});

gulp.task('scripts', function() {

 return gulp.src(paths.scripts)
  .pipe(concat(uncompressedJs))
  .pipe(injector())
  .pipe(header(banner, { pkg: pkg } ))
  .pipe(gulp.dest(paths.dist))
  //.pipe(sourcemaps.init())
  //.pipe(uglify({preserveComments: 'all'}))
  .pipe(rename(compressedJs))
  .pipe(gulp.dest(paths.dist))

});

gulp.task('watch', function() {
  var files = [].concat(paths.src, paths.views, paths.lib);

  return gulp.watch(files, function(){
    runSequence('scripts', 'browser-reload');
  });
  //gulp.watch(paths.views, ['scripts']);
  //gulp.watch(paths.lib,   ['scripts']);
});

gulp.task('browser-reload', function(){
  browserSync.reload();
})

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./examples",
      routes: {
        '/dist/filter.js': './dist/filter.js'
      }
    }
  });
});

gulp.task('build', function(cb){
  runSequence('clean', 'scripts', cb)
});

gulp.task('default', function(cb){
  runSequence('clean', 'scripts', ['browser-sync', 'watch']);
});
