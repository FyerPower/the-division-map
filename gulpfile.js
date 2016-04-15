var gulp        = require('gulp'),
    del         = require('del'),
    concat      = require('gulp-concat'),
    livereload  = require('gulp-livereload'),
    sass        = require('gulp-sass'),
    cleanCSS    = require('gulp-clean-css'),
    sourcemaps  = require('gulp-sourcemaps'),
    uglify      = require('gulp-uglify'),
    ngAnnotate  = require('gulp-ng-annotate'),
    templateCache = require('gulp-angular-templatecache');

//
// Paths
//

var PATHS = {
    styles:     'src/**/*.scss',
    javascript: [
        'src/js/app.js',
        'src/js/modules/**/*.module.js',
        'src/js/**/*.js',
    ],
    templates: [
        'src/js/**/*.html',
    ],
    static: [
        'src/**/*.{png,jpg,ico,svg}',
        'src/index.html',
    ],
    lib: [
        'bower_components/angular-google-gapi/dist/angular-google-gapi.min.js',
        'src/js/libraries/*.js',
    ]
};

//
// Build Tasks
//

// Watch task js and then move to /dist
gulp.task('js', function () {
    return gulp.src(PATHS.javascript)
        .pipe(concat('js/app.js'))
        .pipe(ngAnnotate())
        // .pipe(uglify())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

// Watch task templates and then move to /dist
gulp.task('templates', function () {
    return gulp.src(PATHS.templates)
        .pipe(templateCache({module: 'theDivisionAgent'}))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

// Watch task to convert our scss files to css and move to /dist
gulp.task('styles', function () {
    return gulp.src(PATHS.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

// Watch task to move static files from /src to /dist
gulp.task('static', function() {
    return gulp.src(PATHS.static)
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

// 3rd Party Libraries
gulp.task('lib', function() {
    return gulp.src(PATHS.lib)
        .pipe(gulp.dest('dist/lib'))
        .pipe(livereload());
});

gulp.task('build', ['js', 'styles', 'static', 'lib', 'templates']);

//
// Other Tasks
//

// Clean up the /dist
gulp.task('clean', function (done) {
    del(['dist'], done);
});

// Our main task `gulp play` starts the server (localhost:9000) and starts our watches
gulp.task('play', ['build'], function () {
    livereload.listen();
    gulp.watch(PATHS.javascript, ['js']);
    gulp.watch(PATHS.static, ['static']);
    gulp.watch(PATHS.styles, ['styles']);
    gulp.watch(PATHS.lib, ['lib']);
    gulp.watch(PATHS.templates, ['templates']);
});
gulp.task('default', ['play']);
