import fs from 'fs';
import ttf2woff from 'gulp-ttf2woff';
import ttf2woff2 from 'gulp-ttf2woff2';

export const ttfToWoff = () => {
    // ищем файлы шрифтов .ttf
    return app.gulp.src(`${app.paths.src.fonts}*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: 'FONTS',
                message: 'Error: <%= error.message %>'
            })
        ))
        .pipe(ttf2woff())
        // выгружаем в папку с результатом
        .pipe(app.gulp.dest(`${app.paths.build.fonts}`))
        // ищем файлы шрифтов .ttf
        .pipe(app.gulp.src(`${app.paths.src.fonts}*.ttf`))
        // конвертируем в woff2
        .pipe(ttf2woff2())
        // выгружаем в папку с результатом
        .pipe(app.gulp.dest(`${app.paths.build.fonts}`))
}

export const fontsStyle = () => {
    // файл стилей подключения шрифтов
    const fontsFile = `${app.paths.src.styles}fonts.scss`;
    // проверяем существует ли файлы шрифтов
    fs.readdir(app.paths.build.fonts, function (err, fontsFiles) {
        if(fontsFiles) {
            // проверяем существует ли файл стилей  для подключения шрифтов, удалить файл fonts.scss для обновления
            if(!fs.existsSync(fontsFile)) {
                // если файла нет, создаем его
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly = null;
                for (let i = 0; i < fontsFiles.length; i++) {
                    // записываем подключение шрифтов в файл стилей
                    const fontFileName = fontsFiles[i].split('.')[0];
                    if (newFileOnly !== fontFileName) {
                       let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                       let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
                       if (fontWeight.toLowerCase() === 'thin') {
                           fontWeight = 100;
                       } else if (fontWeight.toLowerCase() === 'extralight') {
                           fontWeight = 200;
                       } else if (fontWeight.toLowerCase() === 'light') {
                           fontWeight = 300;
                       } else if (fontWeight.toLowerCase() === 'medium') {
                           fontWeight = 500;
                       } else if (fontWeight.toLowerCase() === 'semibold') {
                           fontWeight = 600;
                       } else if (fontWeight.toLowerCase() === 'bold') {
                           fontWeight = 700;
                       } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                           fontWeight = 800;
                       } else if (fontWeight.toLowerCase() === 'black') {
                           fontWeight = 900;
                       } else {
                           fontWeight = 400;
                       }
                       fs.appendFile( fontsFile,
                           `@font-face {
                                font-family: ${fontName};
                                font-display: swap;
                                src: url('../fonts/${fontFileName}.woff2') format('woff2'), url('../fonts/${fontFileName}.woff') format('woff');
                                font-weight: ${fontWeight};
                                font-style: normal;
                           }\r\n`, cb);
                        newFileOnly = fontFileName;
                    } else {
                        console.log('для обновления удалите файл')
                    }
                }
            }
        }
    })
    return app.gulp.src(`${app.paths.src}`)
    function cb() { }
}
