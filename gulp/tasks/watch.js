'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./app/scss/*.scss', $.gulp.series('sass'));
    $.browserSync.watch('app/*.html', $.browserSync.reload);
    $.browserSync.watch('app/*.css', $.browserSync.reload);
    $.browserSync.watch('app/js/*.js', $.browserSync.reload);
    // $.gulp.watch('./app/**/*.html').on('change', $.browserSync.reload);
  });
};