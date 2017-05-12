'use strict'
/************************************
 * Configure build directory structure
 ************************************/

//#region main
const buildDir = './dist';
const staticAssetsDir = `${buildDir}/static`;
const cssDir = `${staticAssetsDir}/css`;
const jsDir = `${staticAssetsDir}/js`;
const imgDir = `${staticAssetsDir}/img`;
const fontsDir = `${staticAssetsDir}/fonts`;
//#endregion


const paths = {
    source: {
        css: 'ng/**/*.css',
        ts: ['ng/main.ts', 'ng/app/**/*.ts'],
        html: ['ng/app/**/*.html', '!app/index.html'],
        index: 'ng/index.sjs.html',
        config: ['tsconfig.json'],
        sjs: 'ng/systemjs*.js'
    },
    build: {
        root: 'wwwroot',
        css: 'wwwroot',
        js: 'wwwroot',
        html: 'wwwroot/app'
    }
};



/************************************
 * Require Libs
 ************************************/

const gulp = require('gulp'),
    ts = require('gulp-typescript'),
    tslint = require('gulp-tslint'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del');
var exec = require('child_process').exec;


/************************************
 * Initialization
 ************************************/


var tsProject = ts.createProject('tsconfig.json');


/************************************
 * Build Tasks
 ************************************/


//gulp.task('default', ['logTasks']);

gulp.task('default', ['clean', 'ts', 'css', 'html', 'serve']);


gulp.task('logTasks', () => {
    process.nextTick(() => {
        console.log();
        console.log('gulp serve           serves your app locally');
        console.log('gulp serve --prod    serves the production build of your app locally');
        console.log('gulp build           bundles your app for production');
        console.log('gulp test            runs your tests');
        console.log();
    });
});

gulp.task('serve2', () => {
    clean()
        .then(compileAssets)
        .then(render)
        .then(startServer);
});


gulp.task('clean', function () {
    // Create an empty distribution directory to avoid errors (See #1).
    clean();
    //return gulp.src('/').pipe(gulp.dest(paths.build.root));

});


function clean() {
    return new Promise(resolve => {
        del.sync([paths.build.root + '/**/*', '!' + paths.build.root]);
        resolve();
    });
}

function compileAssets() {
    const promises = [];
    promises.push(compileSass());
    promises.push(compileJs());
    //.then(copyImages)
    //.then(copyFonts));  
    return Promise.all(promises);
}
gulp.task('html', function () {
    render()
});

function render() {
    return new Promise(resolve => {
        gulp.src(paths.source.index)
            .pipe(gulp.dest(paths.build.root));

        gulp.src(paths.source.html)
            .pipe(gulp.dest(paths.build.html))
            //.on('end', resolve);
            .on('end', () => {
                console.log('end render');
                resolve();
            });
    });
}

gulp.task('ts', function () {
    compileJs();
});

function compileJs() {
    return new Promise(resolve => {
        var tsResult = tsProject.src() // or tsProject.src()  You can replace gulp.src(...) with tsProject.src() to load files based on the tsconfig file (based on files, excludes and includes).
            .pipe(sourcemaps.init())
            .pipe(tsProject());
        tsResult.dts.pipe(gulp.dest(paths.build.js))
        gulp.src(paths.source.sjs)
            .pipe(gulp.dest(paths.build.root));
        return tsResult.js
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(paths.build.js))
            .on('end', () => {
                console.log('end js');
                resolve();
            });
    });
}

gulp.task('css', function () {
    compileSass();
});

function compileSass() {
    return new Promise(resolve => {
        gulp.src(paths.source.css)
            //.pipe(concat('app.css'))
            //.pipe(less())
            //.pipe(cleanCss())
            .pipe(gulp.dest(paths.build.css))
            .on('end', () => {
                console.log('end sas');
                resolve();
            });
        // .pipe(browserSync.stream());
    });
}

gulp.task('check-ts', function () {
    return gulp.src(paths.source.ts)
        .pipe(tslint({
            formatter: 'verbose'
        }))
        .pipe(tslint.report({
            emitError: false
        }));
});

gulp.task('serve', function (cb) {
    startServer();
});

function startServer() {
    exec('npm run serve', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        //cb(err);
    });
}