const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");
const page_data = require("../src/page-data.json");
const { baseFolder, outputFolder } = require("./constants");

const createGulpXml = function (templates) {
  if (typeof templates !== "string") {
    throw new Error("createGulpXml: no templates folder specified");
  }

  const njkXml = function () {
    return gulp
      .src(`${baseFolder}/pages/**/*.xml`)
      .pipe(data(page_data))
      .pipe(
        nunjucksRender({
          path: [`${baseFolder}/${templates}/templates`],
          ext: ".xml",
          envOptions: {
            autoescape: false,
            throwOnUndefined: true,
          },
        })
      )
      .pipe(gulp.dest(outputFolder));
  };
  return njkXml;
};

module.exports = createGulpXml;
