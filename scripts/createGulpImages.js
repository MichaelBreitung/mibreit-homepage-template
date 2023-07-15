const gulp = require('gulp');
const { baseFolder, outputFolder } = require('./constants');

const createGulpImages = function (images, favicon, plugins) {
  const copyImages = function () {
    if (Array.isArray(images)) {
      return gulp
        .src(images.map((folder) => `${baseFolder}/${folder}/images/**/*.+(jpg|png|gif|svg)`))
        .pipe(gulp.dest(`${outputFolder}/images`));
    } else if (typeof images === 'string') {
      return gulp
        .src(`${baseFolder}/${images}/images/**/*.+(jpg|png|gif|svg)`)
        .pipe(gulp.dest(`${outputFolder}/images`));
    } else {
      return Promise.resolve('copyImages: nothing to do');
    }
  };

  const copyFavIcon = function () {
    if (typeof favicon === 'string') {
      return gulp
        .src(`${baseFolder}/${favicon}/images/favicon.ico`, { allowEmpty: true })
        .pipe(gulp.dest(outputFolder));
    } else {
      return Promise.resolve('copyFavIcon: nothing to do');
    }
  };

  const copyPagesImages = function () {
    return gulp.src(`${baseFolder}/pages/**/*.+(jpg|png|gif|svg)`).pipe(gulp.dest(`${outputFolder}`));
  };

  const imageTasks = [copyImages, copyFavIcon, copyPagesImages];

  if (Array.isArray(plugins)) {
    const createCopyImages = function (pluginFolder) {
      return function () {
        return gulp
          .src(`${baseFolder}/plugins/${pluginFolder}/images/*.+(jpg|png|gif|svg)`)
          .pipe(gulp.dest(`${outputFolder}/scripts/${pluginFolder}/images/`));
      };
    };

    plugins.forEach(function (pluginFolder) {
      imageTasks.push(createCopyImages(pluginFolder));
    });
  }

  return gulp.parallel(imageTasks);
};

module.exports = createGulpImages;
