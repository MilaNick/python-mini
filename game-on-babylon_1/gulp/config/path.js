import * as path from 'path';

const rootPath = path.basename(path.resolve());
const buildPath = './dist';
const srcPath = './src';

export const paths = {
    base: {
        build: buildPath,
        clean: buildPath,
        ftp: 'test', // название папки на сервере
        root: rootPath,
        src: srcPath,
    },
    build: {
        css: `${buildPath}/assets/styles`,
        fonts: `${buildPath}/assets/fonts`,
        html: `${buildPath}`,
        images: `${buildPath}/assets/images`,
        js: `${buildPath}/assets/scripts`,

    },
    src: {
        fonts: `${srcPath}/assets/fonts/`,
        html: `${srcPath}/*.*`,
        images: `${srcPath}/assets/images/*.{jpeg,jpg,png,gif,webp}`,
        js: `${srcPath}/assets/scripts/index.js`,
        scss: `${srcPath}/assets/styles/index.scss`,
        styles: `${srcPath}/assets/styles/`,
        svg: `${srcPath}/assets/images/*.svg`,
    },
    watch: {
        all: `${srcPath}/**/*.*`,
        images: `${srcPath}/assets/images/*.{jpeg,jpg,png,gif,webp,svg}`,
        js: `${srcPath}/assets/scripts/index.js`,
        scss: `${srcPath}/assets/styles/index.scss`
    },
}
