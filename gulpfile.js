const gulp = require('gulp');
const sass = require('gulp-sass');
const sourceMaps = require('gulp-sourcemaps');
const autoPrefixer = require('gulp-autoprefixer');
const browserSync = require("browser-sync");
const connect = require('gulp-connect-php');
const svgSprite = require('gulp-svg-sprites');
var terser = require('gulp-terser');

function styles(cb) {
    return gulp.src('./ressources/liaisons/scss/**/*.scss')
        .pipe(sourceMaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoPrefixer({
            /*browsers: ['last 2 versions'],*/
            cascade: false
        }))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('./web/liaisons/css'))
        .pipe(browserSync.stream());
}

function watch(cb) {
    connect.server({}, function (){
        browserSync( {
            /*  Pour le PHP on utilise un proxy
            *   Remplacer le USER et le NOMPROJET
            *  genre "localhost/~etu01/rpni3/rpni3-crs2/" */
            proxy: "localhost:8888/elvis-le-quiz-du-rock/web"
        });
    });

    gulp.watch('./app/**/*.php').on("change",browserSync.reload);
    gulp.watch('./ressources/vues/**/*.php').on("change",browserSync.reload);
    gulp.watch('./ressources/liaisons/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('./ressources/liaisons/ts/**/*.js').on("change",browserSync.reload);

    cb();
}


var config = {
    mode: {
        //css: true, // Create a «css» sprite
        // view: true, // Create a «view» sprite
        // defs: true, // Create a «defs» sprite
         symbol: true, // Create a «symbol» sprite
        //  stack: true // Create a «stack» sprite
    }
};

function sprite(){
    return gulp.src('.ressource/liaisons/images/svg/*.svg')
        .pipe(svgSprite(config))
        .pipe(gulp.dest('.web/liaisons/images/svg'));
}

function defaut(cb){
    console.log("allo");
    // place code for your default task here
    cb();
}

// Tâche 'js'
function compressjs(cb) {
    return gulp.src('./web/liaisons/js/*.js')
        .pipe(terser())
        .pipe(gulp.dest('./web/liaisons/js/'));
    cb();
}

exports.default=defaut;
exports.styles=styles;
exports.watch=watch;
exports.sprite=sprite;
exports.compressjs=compressjs;