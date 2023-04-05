const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");
const page_data = require("../src/page-data.json");
const { baseFolder, outputFolder } = require("./constants");

const createGulpPhpScripts = function (templates, scripts) {
  if (typeof templates !== "string") {
    throw (new Error("createGulpPhpScripts: no templates folder specified"));
  }

  const source = [`${baseFolder}/scripts/**/*.php`];
  if (typeof scripts === "string")
  {  
    source.push(`${baseFolder}/${scripts}/scripts/**/*.php`);
  }

  const njkPhpScripts = function () {
    return gulp
      .src(source)
      .pipe(data(page_data))
      .pipe(
        nunjucksRender({
          path: [`${baseFolder}/${templates}/templates`],
          ext: ".php",
          envOptions: {
            autoescape: false,
            throwOnUndefined: true,
          },
        })
      )
      .pipe(gulp.dest(`${outputFolder}/scripts`));
  }
  return njkPhpScripts;
};

module.exports = createGulpPhpScripts;
