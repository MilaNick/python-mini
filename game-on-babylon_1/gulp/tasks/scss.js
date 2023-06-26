import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import autoprefixer from 'gulp-autoprefixer'; // добавление вендорных префиксов
import cleanCss from 'gulp-clean-css'; // сжатие css файла
// группировка медиа запросов
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import webpcss from 'gulp-webpcss'; // вывод webp изображений

const sass = gulpSass(dartSass);
export const scss = () => {
    return app.gulp.src(app.paths.src.scss, { sourcemaps: app.isDev }) // собираем стили из модулей и хотим знать в каком файле написан стиль
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title:'SCSS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                webpcss(
                    {
                        webpClass: '.webp',
                        noWebpClass: '.no-webp',
                    }
                )
            )
        )
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserslist: ['last 3 versions'],
                    cascade: true,
                })
            )
        )
        // Раскоментировать, если НЕ нужен минимизированный файл
        // .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.paths.build.css))
        .pipe(app.plugins.browsersync.stream())
}
