const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");
const page_data = require("../src/page-data.json");
const { baseFolder, outputFolder} = require("./constants");

const njkXml =  function () {
  return gulp
    .src(`${baseFolder}/pages/**/*.xml`)
    .pipe(data(page_data))
    .pipe(
      nunjucksRender({
        path: [`${baseFolder}/templates`],
        ext: ".xml",
        envOptions: {
          autoescape: false,
        },
      })
    )
    .pipe(gulp.dest(`${outputFolder}`));
};

module.exports = njkXml;