var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var ngdocs = require('gulp-ngdocs');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');

var buildDir = 'dist/';

var depsJs = ['node_modules/jquery/dist/jquery.min.js',      
              'node_modules/angular/angular.min.js', 
              'node_modules/angular-messages/angular-messages.min.js',
              'node_modules/angular-ui-router/release/angular-ui-router.min.js',
              'node_modules/ngstorage/ngStorage.js',
              'node_modules/bootstrap/dist/js/bootsrap.min.js',
              'node_modules/angular-animate/angular-animate.min.js',
              'node_modules/angular-touch/angular-touch.min.js',
              'src/vendor/uibootstrap/ui-bootstrap-tpls-2.2.0.min.js'];

var appJs = ['src/app.js', 'src/modules.js', 'src/configs.js', 'src/run.js',
              'src/services/**/*.js', 'src/components/**/*.js'];

var mockJs = ['node_modules/angular-mocks/angular-mocks.js',
              'mock-backend/mock-backend.js'];

/** tasks */ 
gulp.task('devDeps', function(){
    var depsjs = gulp.src(depsJs);
    return depsjs.pipe(concat('itp_deps.js'))
     .pipe(gulp.dest('dist'));

});

gulp.task('devJs', function(){
    var js = gulp.src(appJs);
    return js.pipe(concat('itp.js'))
     .pipe(gulp.dest('dist'));
});

gulp.task('mockjs', function(){
    var js = gulp.src(mockJs);
    return js.pipe(concat('mock.js'))
     .pipe(gulp.dest('dist'));
});

/** initialize */

gulp.task('default', function(callback){
    runSequence('devDeps', 'devJs', 'mockjs' , callback);
});

gulp.task('watch', function(){
    gulp.watch('src/**/*.js', ['devJs']);
});