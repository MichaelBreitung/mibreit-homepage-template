const gulp = require("gulp");
const { baseFolder, outputFolder } = require("./constants");

const createGulpFonts = function (fonts) {
  copyFonts = function () {
    if (typeof fonts === "string") {
      return gulp.src(`${baseFolder}/${fonts}/fonts/*.ttf`).pipe(gulp.dest(`${outputFolder}/fonts`));
    }
    return Promise.resolve("nothing to do");
  };
  return copyFonts;
};

module.exports = createGulpFonts;
