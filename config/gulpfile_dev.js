const { src, dest, parallel, series, watch } = require('gulp')
const connect = require('gulp-connect')
const sass = require('gulp-sass')
const path = require('path')
const webpack = require('webpack-stream')
const proxy = require('http-proxy-middleware')
const devPath = '../dev'
function opendServer() {
    return connect.server({
        name: 'Dev App',
        root: [`${devPath}`],
        port: 9000,
        livereload: true,
        // host:'10.9.49.228'
    });
}
function copyHtml() {
    return src('../src/**/*.html')
        .pipe(dest(`${devPath}`))
        .pipe(connect.reload())
}
function copyStyles() {
    return src('../src/styles/*-css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(`${devPath}/styles`))
        .pipe(connect.reload())
}
function copyJs() {
    return src('../src/js/*-js/*.js')
        .pipe(webpack({
            entry: {
                index: '../src/js/index-js/index.js',
                more: '../src/js/more-js/more.js'
            },
            output: {
                filename: '[name].js',
                path: path.resolve(__dirname, `${devPath}`)
            },
            mode: 'development',
            module: {
                rules: [
                    {
                        test: /\.art$/,
                        loader: 'art-template-loader',
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            // Creates `style` nodes from JS strings
                            { loader: 'style-loader', options: { injectType: 'lazyStyleTag' } },
                            // Translates CSS into CommonJS
                            'css-loader',
                            // Compiles Sass to CSS
                            'sass-loader',
                        ],

                    }
                ]
            },
        }))
        .pipe(dest(`${devPath}/js`))
        .pipe(connect.reload())
}
function copyAssets() {
    return src('../src/assets/**/*')
        .pipe(dest(`${devPath}/assets`))
        .pipe(connect.reload())
}
function copyLib() {
    return src('../src/js/lib/**/*')
        .pipe(dest(`${devPath}/lib`))
        .pipe(connect.reload())
}
function watchChange() {
    watch(['../src/**/*'], parallel(copyHtml, copyStyles, copyJs, copyAssets, copyLib))
    // watch(['../styles/**/*'], series(copyStyles))
    // watch(['../js/**/*'], series(copyJs))
    // watch(['../assets/**/*'], series(copyAssets))
    // watch(['../js/lib/**/*'], series(copyLib, copyJs))

}
exports.default = series(parallel(copyHtml, copyStyles, copyJs, copyAssets, copyLib), parallel(opendServer, watchChange))