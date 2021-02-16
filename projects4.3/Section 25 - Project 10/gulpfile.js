var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify-es').default;



gulp.task('scripts', async function() {
  return gulp.src([
    /* Add your JS files here, they will be combined in this order */
    'node_modules/jquery/dist/jquery.js',
    'node_modules/popper.js/dist/umd/popper.js',
    // 'node_modules/jquery.easing/jquery.easing.js',
    'node_modules/bootstrap/js/dist/util.js',
    'node_modules/bootstrap/js/dist/alert.js',
    'node_modules/bootstrap/js/dist/button.js',
    'node_modules/bootstrap/js/dist/dropdown.js',
    'node_modules/bootstrap/js/dist/tab.js',
    'node_modules/bootstrap/js/dist/carousel.js',
    'node_modules/bootstrap/js/dist/collapse.js',
    'node_modules/bootstrap/js/dist/modal.js',
    'node_modules/bootstrap/js/dist/scrollspy.js',
    'node_modules/bootstrap/js/dist/tooltip.js',
    'node_modules/bootstrap/js/dist/popover.js',
    'node_modules/bootstrap/js/dist/toast.js',

    'src/js/vendor/font-awesome.js',

    'src/js/main.js'



    ])
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./js'));
});

gulp.task('sass', async function () {
    gulp.src('src/scss/main.scss')
        .pipe(sass({includePaths: ['scss']}))
        .pipe(gulp.dest('./css'))
        .pipe(minifycss());
});
gulp.task('html', async function () {
    gulp.src('./*.html')
        .pipe(gulp.dest('./'));
});
gulp.task('browser-sync', async function() {
    browserSync.init(["css/*.css", "js/*.js"], {
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', gulp.series('sass', 'browser-sync'), function () {
    gulp.watch("src/scss/**/*.scss", ['sass']).on("change", reload);
    gulp.watch("./*.html", ['html']).on("change", reload);
    gulp.watch("src/js/*.js", ['scripts']).on("change", reload);
});
