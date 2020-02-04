const gulp = require('gulp');
const watch = require("gulp-watch");
const rollup = require("gulp-rollup");
const replace = require("rollup-plugin-replace");
const ts = require("gulp-typescript");
const eslint = require('gulp-eslint');
const tsConfig = ts.createProject("./tsconfig.json");
const entry = "./app/**/*.ts";

//开发环境
// function builddev() {
//     return watch(entry, {
//         ignoreInitial: false
//     }, function () {
//         gulp.src(entry)
//             // .pipe(babel({
//             //     babelrc: false,
//             //     "plugins": [
//             //         ["@babel/plugin-proposal-decorators", {
//             //             "legacy": true
//             //         }],
//             //         "transform-es2015-modules-commonjs"
//             //     ]
//             // }))
//             .pipe(
//                 gulpTslint.report({
//                     allowWarnings: true
//                 })
//             )
//             .pipe(tsConfig())
//             .pipe(gulp.dest('dist'))
//     });
// }


//清洗环境
// function buildconfig() {
//     return gulp.src(entry)
//         .pipe(rollup({
//             output: {
//                 format: "cjs"
//             },
//             plugins: [
//                 replace({
//                     "process.env.NODE_ENV": JSON.stringify('production')
//                 })
//             ],
//             input: "./dist/config/index.js"
//         }))
//         .pipe(gulp.dest('./dist'));
// }

//对代码进行检查的环境
function buildlint() {
    return gulp.src(entry)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}
// let build = gulp.series(builddev);
let build ;
if (process.env.NODE_ENV == "production") {
    //上线环境
    function buildprod() {
        return gulp.src(entry)
            .pipe(tsConfig())
            .pipe(gulp.dest('dist'));
    }
    build = gulp.series(buildprod );
}
if (process.env.NODE_ENV == "lint") {
    build = gulp.series(buildlint);
}
gulp.task("default", build);