const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");
const page_data = require("../src/page-data.json");
const { baseFolder, outputFolder } = require("./constants");

const createGulpPhpScripts = function (templates) {
  if (typeof templates !== "string") {
    throw (new Error("createGulpPhpScripts: no templates folder specified"));
  }

  const njkPhpScripts = function () {
    return gulp
      .src([`${baseFolder}/scripts/**/*.php`])
      .pipe(data(page_data))
      .pipe(
        nunjucksRender({
          path: [`${baseFolder}/${templates}/templates`],
          ext: ".php",
          envOptions: {
            autoescape: false,
          },
        })
      )
      .pipe(gulp.dest(`${outputFolder}/scripts`));
  }
  return njkPhpScripts;
};

module.exports = createGulpPhpScripts;
