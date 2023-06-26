import gulp from 'gulp';

import { connectFtp } from './gulp/tasks/ftp.js';
import { copy } from './gulp/tasks/copy.js';
import { images } from './gulp/tasks/images.js';
import { js } from './gulp/tasks/js.js';
import { paths } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';
import { reset } from './gulp/tasks/reset.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';
import { zip } from './gulp/tasks/zip.js';

global.app = {
    gulp,
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    paths,
    plugins,
}

const watcher = () => {
    gulp.watch(paths.watch.all, copy); // вместо copy gulp.series(copy, ftp)для вотчера, можно и следующие строки изменить также
    gulp.watch(paths.watch.images, images);
    gulp.watch(paths.watch.js, js);
    gulp.watch(paths.watch.scss, scss);
}

const fonts = gulp.series(ttfToWoff, fontsStyle);
const mainTasks = gulp.series(fonts, gulp.parallel(images, js, scss, copy))
const dev = gulp.series(reset, mainTasks, gulp.parallel(server, watcher))
const build = gulp.series(reset, mainTasks)
const deployZIP = gulp.series(reset, mainTasks,zip)
const deployFTP = gulp.series(reset, mainTasks, connectFtp)

// экспорт сценарии
export { dev }
export { build }
export { deployZIP }
export { deployFTP }

gulp.task('default', dev)
