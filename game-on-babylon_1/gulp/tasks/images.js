import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';
import webP from "gulp-webp-html-nosvg";

export const images = () => {
    return app.gulp.src(app.paths.src.images)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title:'IMAGES',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(app.plugins.newer(app.paths.build.images))
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                webp()
            )
        )
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                app.gulp.dest(app.paths.build.images)
            )
        )
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                app.gulp.src(app.paths.src.images)
            )
        )
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                app.plugins.newer(app.paths.build.images)
            )
        )
        .pipe(
            app.plugins.ifPlugin(
                app.isBuild,
                imagemin({
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    interlaced: true,
                    optimizationLevel: 3 // 0 to 7 степень сжатия
                })
            )
        )
        .pipe(app.gulp.dest(app.paths.build.images))
        .pipe(app.gulp.src(app.paths.src.svg))
        .pipe(app.gulp.dest(app.paths.build.images))
        .pipe(app.plugins.browsersync.stream());
}
