const gulp = require("gulp");
const concat = require("gulp-concat");
const cleanCss = require("gulp-clean-css");

const { baseFolder, outputFolder, tempFolder } = require("./constants");

const createGulpCss = function (styles) {
  if (typeof styles !== "string" && !Array.isArray(styles)) {
    throw (new Error("createGulpCss: no styles folder specified"));
  }

  const gatherCss = function () {
    return gulp
      .src(styles.map((folder) => `${baseFolder}/${folder}/styles/*.css`))
      .pipe(gulp.dest(`${baseFolder}/${tempFolder}/styles`));

  };

  const createProcessCss = function (sourceFolder) {
    const processCss = function () {
      return gulp
        .src([
          `${baseFolder}/${sourceFolder}/styles/*.css`,
          `!${baseFolder}/${sourceFolder}/styles/media.css`,
          `${baseFolder}/scripts/**/*.css`,
          `${baseFolder}/${sourceFolder}/styles/media.css`,
        ])
        .pipe(concat("styles.css"))
        .pipe(cleanCss({ compatibility: "ie8" }))
        .pipe(gulp.dest(`${outputFolder}/styles`));
    }
    return processCss;
  }

  if (Array.isArray(styles)) {
    return gulp.series(gatherCss, createProcessCss(tempFolder));
  }
  else {
    return createProcessCss(styles);
  }
}

module.exports = createGulpCss;
