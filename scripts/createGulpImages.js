const gulp = require("gulp");
const { baseFolder, outputFolder} = require("./constants");

const createGulpImages = function (variant) {
  const copyImages = function (variant) {
    if (Array.isArray(variant.images)) {
      return gulp
        .src(variant.images.map((folder) => `${baseFolder}/${folder}/images/**/*.+(jpg|png|gif|svg)`))
        .pipe(gulp.dest(`${outputFolder}/images`));
    } else {
      return gulp
        .src(`${baseFolder}/${variant.images}/images/**/*.+(jpg|png|gif|svg)`)
        .pipe(gulp.dest(`${outputFolder}/images`));
    }
  };
  
  const copyGalleryImages = function () {
    return gulp
      .src(`${baseFolder}/scripts/mibreit-gallery/images/*.+(jpg|png|gif|svg)`)
      .pipe(gulp.dest(`${outputFolder}/images`));
  };
  
  const copyFavIcon = function () {
    return gulp
      .src(`${baseFolder}/${variant.favicon}/images/favicon.ico`)
      .pipe(gulp.dest(outputFolder));
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
