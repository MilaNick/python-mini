import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

export const connectFtp = () => {
    configFTP.log = util.log;
    const ftpConnection = vinylFTP.create(configFTP);
    return app.gulp.src(`${app.paths.base.build}/**/*.*`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title:'FTP',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(ftpConnection.dest(`/${app.paths.base.ftp}/${app.path.base.root}`))
}
