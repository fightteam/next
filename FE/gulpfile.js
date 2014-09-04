'use strict';
/**
 * gulp 构建配置
 */

// 项目配置
var _app = "src/main/app";
var assets = _app + "/assets";
var tmp = "build/.tmp";
var styles = assets + "/styles";
var scripts = assets + "/scripts";
var dist = "src/main/webapp"
var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var gutil = require('gulp-util');

gulp.task('scss', function () {
    return gulp.src(styles + '/scss/**/*.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest(tmp + "/assets/styles"))
        .pipe($.size());
});

gulp.task('less', function () {
    return gulp.src([styles +'/less/**/*.less', "!" + styles +"/less/**/_*.less", "!" + styles +"/less/vendors/**", "!" + styles +"/less/base/**"])
    .pipe($.less({
      paths: [ styles + '/bower_components' ]
    }))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest(tmp + "/assets/styles"))
    .pipe($.size());
});

gulp.task('styles', ['scss', 'less']);

gulp.task('js', function () {
    return gulp.src(scripts + '/js/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe(gulp.dest(tmp + '/assets/scripts'))
        .pipe($.size());
});

gulp.task('coffee', function() {
    return gulp.src(scripts + "/coffee/**/*.coffee")
    .pipe($.coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest(tmp + '/assets/scripts'))
    .pipe($.size());
});

gulp.task('scripts', ['js', 'coffee']);

gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

return gulp.src(_app + '/*.html')
        .pipe($.useref.assets({searchPath: "{" + tmp +"," + _app + "}"}))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest(dist + "/*.jsp"))
        .pipe($.size());


});

gulp.task('images', function () {
    return gulp.src(assets + '/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(dist + '/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return $.bowerFiles()
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest(dist + '/fonts'))
        .pipe($.size());
});

gulp.task('extras', function () {
    return gulp.src([_app + '/*.*', "!" + _app + "/*.html"], { dot: true })
        .pipe(gulp.dest(dist));
});

gulp.task('clean', function () {
    return gulp.src([tmp, dist + "/**/*", "!" + dist + "{/WEB-INF,/META-INF}{,/**}"])
    .pipe($.clean());
});

gulp.task('build', ['html', 'images', 'fonts', 'extras']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static(_app))
        .use(connect.static(tmp))
        .use(connect.directory(_app));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'styles'], function () {
    require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src( styles + '/**/*.scss')
        .pipe(wiredep({
            directory: assets + '/bower_components'
        }))
        .pipe(gulp.dest(styles));

    gulp.src(_app + '/*.html')
        .pipe(wiredep({
            directory: assets + '/bower_components'
        }))
        .pipe(gulp.dest(_app));
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        _app + '/*.html',
        styles + '/**/*.css',
        scripts + '/**/*.js',
        assets + '/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch(styles + '/scss/**/*.scss', ['scss']);
    gulp.watch(styles + '/less/**/*.less', ['less']);
    gulp.watch(scripts + '/js/**/*.js', ['js']);
    gulp.watch(scripts + '/coffee/**/*.coffee', ['coffee']);
    gulp.watch(assets + '/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
