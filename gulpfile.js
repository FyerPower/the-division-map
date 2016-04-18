var gulp          = require('gulp'),
    del           = require('del'),
    concat        = require('gulp-concat'),
    livereload    = require('gulp-livereload'),
    sass          = require('gulp-sass'),
    cleanCSS      = require('gulp-clean-css'),
    sourcemaps    = require('gulp-sourcemaps'),
    uglify        = require('gulp-uglify'),
    ngAnnotate    = require('gulp-ng-annotate'),
    templateCache = require('gulp-angular-templatecache'),
    browserify    = require("browserify"),
    source        = require("vinyl-source-stream"),
    tsify         = require('tsify');

//
// Paths
//

var PATHS = {
    styles: 'src/**/*.scss',
    javascript: [
        'src/js/app.js',
        'src/js/modules/**/*.module.js',
        'src/js/**/*.js',
    ],
    typescript: [
        'src/js/modules/builds/*.ts',
        'src/js/modules/builds/**/*.ts'
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


gulp.task('typescript', function(){
    var browserifyOpts = {
		debug: false,
		paths: ['./node_modules', './src/js/'],
		cache: {},
		packageCache: {},
		fullPaths: true
	};

    return browserify('src/js/modules/builds/builds.module.ts', browserifyOpts)
            .plugin(tsify)
            .bundle()
			.pipe(source('ng2.js'))
			.pipe(gulp.dest('dist/js'))
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

gulp.task('build', ['js', 'styles', 'static', 'lib', 'templates', 'typescript']);

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
    gulp.watch(PATHS.typescript, ['typescript']);
});
gulp.task('default', ['play']);
