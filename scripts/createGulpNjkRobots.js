const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");
const page_data = require("../src/page-data.json");
const { baseFolder, outputFolder } = require("./constants");

const createGulpHtAccess = function (templates) {
  const njkRobots = function () {
    return gulp
      .src(`${baseFolder}/pages/robots.txt`)
      .pipe(data(page_data))
      .pipe(
        nunjucksRender({
          path: [`${baseFolder}/${templates}/templates`],
          ext: ".txt",
          envOptions: {
            autoescape: false,
            throwOnUndefined: true,
          },
        })
      )
      .pipe(gulp.dest(outputFolder));
  };
  return njkRobots;
};

module.exports = createGulpHtAccess;
