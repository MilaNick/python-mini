import browsersync from 'browser-sync'; // локальный сервер
import ifPlugin from 'gulp-if'; // select prod & dev
import newer from 'gulp-newer'; // проверка обновления картинки
import notify from 'gulp-notify'; // сообщения, подсказки
import plumber from 'gulp-plumber'; // обработка ошибок
import replace from 'gulp-replace'; // поиск, замена

export const plugins = {
    browsersync,
    ifPlugin,
    newer,
    notify,
    plumber,
    replace,
}
