const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const through2 = require("through2");
const data = require("gulp-data");
const prettyHtml = require("./prettyHtml");
const inlineNewsletterCss = require("./inlineNewsletterCss");
const page_data = require("../src/page-data.json");
const { baseFolder, outputFolder } = require("./constants");

const createGulpHtml = function (templates) {
  if (typeof templates !== "string") {
    throw new Error("createGulpHtml: no templates folder specified");
  }

  const njkHtml = function () {
    return gulp
      .src(`${baseFolder}/pages/**/*.html`)
      .pipe(data(page_data))
      .pipe(
        nunjucksRender({
          path: [`${baseFolder}/${templates}/templates`],
          envOptions: {
            autoescape: false,
            trimBlocks: true,
            lstripBlocks: true,
            throwOnUndefined: true,
          },
        })
      )
      .pipe(through2.obj(inlineNewsletterCss))
      .pipe(through2.obj(prettyHtml))
      .pipe(gulp.dest(outputFolder));
  };
  return njkHtml;
};

module.exports = createGulpHtml;
