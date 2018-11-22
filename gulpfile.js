var gulp = require('gulp');

gulp.task('javascripts', function() {
    sources = [
      './node_modules/renderjson/renderjson.js',
      './node_modules/bootstrap/dist/js/bootstrap.min.js',
      './node_modules/identicon.js/identicon.js',
    ]
    gulp.src( sources ).pipe(gulp.dest('./public/javascripts/lib/'));
});

gulp.task('default', ['javascripts']);
