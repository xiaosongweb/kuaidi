const { src, dest, series, parallel, watch } = require("gulp")
const connect = require("gulp-connect")
const sass = require("gulp-sass")
const path = require("path")
const webpack = require("webpack-stream")
const proxy = require('http-proxy-middleware')
const { proxyList } = require('./config/config')
function openServer() {
    return connect.server({
        name: 'Dist App',
        root: 'dist',
        port: 8888,
        livereload: true,
        middleware: function () {
            let list = []
            for (let attr in proxyList) {
                let url = '/' + attr
                let key = '^/' + attr
                list.push(
                    proxy(url, {
                        target: proxyList[attr],
                        changeOrigin: true,
                        pathRewrite: {
                            [key]: ''
                        }
                    })
                )
            }
            return list
        }

    });
}
function copyHtml() {
    return src("./src/*.html")
        .pipe(dest("./dist/"))
        .pipe(connect.reload());
}
function copyAssets() {
    return src("./src/assets/**/*")
        .pipe(dest("./dist/assets/"))
        .pipe(connect.reload());
}

function copySass() {
    return src(["./src/styles/**/*.scss", "!./src/styles/libs/yo3/**"])
        .pipe(sass().on('error', sass.logError))
        .pipe(dest("./dist/styles/"))
        .pipe(connect.reload());
}

function copyJs() {
    return src(["./src/js/**/*", "!./src/js/libs/**/*"])
        .pipe(webpack({
            entry: './src/js/app.js',
            output: {
                filename: 'app.js',
                path: path.resolve(__dirname, './dist')
            },
            mode: "development",
            module: {
                rules: [
                    {
                        test: /\.art$/,
                        loader: "art-template-loader",
                    }
                ]
            },
        }))
        .pipe(dest("./dist/js/"))
        .pipe(connect.reload());
}


function watchFiles() {
    watch(['./src/*.html'], series(copyHtml))
    watch(["./src/styles/**/*.scss", "!./src/styles/libs/yo3/**"], series(copySass))
    watch(["./src/js/**/*", "!./src/js/libs/**/*"], series(copyJs))
    watch(['./src/asstes/**/*'], series(copyAssets))
}



exports.default = series(parallel(copyHtml, copySass, copyJs, copyAssets), parallel(openServer, watchFiles))

