import { deleteAsync } from 'del';
import zipPlugin from 'gulp-zip';

export const zip = () => {
    deleteAsync(`./${app.paths.base.root}.zip`);
    return app.gulp.src(`${app.paths.base.build}/**/*.*`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title:'ZIP',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(zipPlugin(`${app.paths.base.root}.zip`))
        .pipe(app.gulp.dest('./'))
}
