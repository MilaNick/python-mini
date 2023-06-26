import fileInclude from 'gulp-file-include';
import versionNumber from 'gulp-version-number'; // кэширование, добавляется ключ кеширования
import webP from 'gulp-webp-html-nosvg';

export const copy = () => {
    return app.gulp.src(app.paths.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'HTML',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(fileInclude())
        .pipe(app.plugins.replace(/@img\//g, 'assets/images/'))
        .pipe(app.plugins.replace(/@js\//g, 'assets/scripts/'))
        .pipe(app.plugins.replace(/@css\//g, 'assets/styles/'))
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                webP()
            )
        )
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '-v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js'
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    },
                })
            )
        )
        .pipe(app.gulp.dest(app.paths.build.html))
        .pipe(app.plugins.browsersync.stream())
}
