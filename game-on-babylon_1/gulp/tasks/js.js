import webpackStream from 'webpack-stream';

export const js = () => {
    return app.gulp.src(app.paths.src.js, { sourcemaps: app.isDev }) // собираем скрипты из модулей и хотим знать в каком файле написан стиль
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title:'JS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(webpackStream({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'index.min.js',
            },
        }))
        .pipe(app.gulp.dest(app.paths.build.js))
        .pipe(app.plugins.browsersync.stream())
}
