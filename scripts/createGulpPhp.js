const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const through2 = require("through2");
const data = require("gulp-data");
const prettyHtml = require("./prettyHtml");
const page_data = require("../src/page-data.json");
const { baseFolder, outputFolder } = require("./constants");

const createGulpPhp = function (variant) {
  const njkPhp = function () {
    return gulp
      .src(`${baseFolder}/pages/**/*.php`)
      .pipe(data(page_data))
      .pipe(
        nunjucksRender({
          path: [`${baseFolder}/${variant.templates}/templates`],
          ext: ".php",
          envOptions: {
            autoescape: false,
            trimBlocks: true,
            lstripBlocks: true,
          },
        })
      )
      .pipe(through2.obj(prettyHtml))
      .pipe(gulp.dest(outputFolder));
  }
  return njkPhp;
};

module.exports = createGulpPhp;