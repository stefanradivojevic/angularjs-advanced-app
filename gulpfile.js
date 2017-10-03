var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var del = require('del');
var runSequence = require('run-sequence');

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')       // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError))  // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('app/css'))               // Outputs it in the css folder
    .pipe(browserSync.reload({                // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
})

// Copy data base mockup folder and files
gulp.src(['app/dbMockup/**/*']).pipe(gulp.dest('dist/dbMockup'));
// Copy bootstrap fonts
gulp.src(['node_modules/bootstrap/dist/fonts/**/*']).pipe(gulp.dest('dist/css/fonts'));

// Optimization Tasks 
// ------------------

gulp.task('scripts', function() {

  return gulp.src(scripts)
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {

  return gulp.src('app/**/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref'],
    callback
  )
})
