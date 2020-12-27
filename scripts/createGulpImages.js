const gulp = require("gulp");
const { baseFolder, outputFolder } = require("./constants");

const createGulpImages = function (images, favicon) {
  const copyImages = function () {
    if (Array.isArray(images)) {
      return gulp
        .src(images.map((folder) => `${baseFolder}/${folder}/images/**/*.+(jpg|png|gif|svg)`))
        .pipe(gulp.dest(`${outputFolder}/images`));
    } else if (typeof images === "string") {
      return gulp
        .src(`${baseFolder}/${images}/images/**/*.+(jpg|png|gif|svg)`)
        .pipe(gulp.dest(`${outputFolder}/images`));
    }
    else {
      return Promise.resolve("copyImages: nothing to do");
    }
  };

  const copyGalleryImages = function () {
    return gulp
      .src(`${baseFolder}/scripts/mibreit-gallery/images/*.+(jpg|png|gif|svg)`)
      .pipe(gulp.dest(`${outputFolder}/images`));
  };

  const copyFavIcon = function () {
    if (typeof favicon === "string") {
      return gulp
        .src(`${baseFolder}/${favicon}/images/favicon.ico`)
        .pipe(gulp.dest(outputFolder));
    }
    else {
      return Promise.resolve("copyFavIcon: nothing to do");
    }
  };

  const copySlideshowImages = function () {
    return gulp.src(`${baseFolder}/pages/**/*.+(jpg|png|gif)`).pipe(gulp.dest(`${outputFolder}`));
  };

  return gulp.parallel(copyImages,
    copyGalleryImages,
    copyFavIcon,
    copySlideshowImages
  );
}

module.exports = createGulpImages;
