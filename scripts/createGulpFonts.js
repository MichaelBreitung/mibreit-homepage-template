const gulp = require("gulp");
const { baseFolder, outputFolder} = require("./constants");

const createGulpFonts = function (variant) {
  copyFonts = function() {
    if (typeof variant.fonts !== "undefined") {
      return gulp
        .src(`${baseFolder}/${variant.fonts}/fonts/*.ttf`)
        .pipe(gulp.dest(`${outputFolder}/fonts`));
    }
    return Promise.resolve("nothing to do");
  }
  return copyFonts;
};

module.exports = createGulpFonts;