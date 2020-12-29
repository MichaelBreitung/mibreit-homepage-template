const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");
const page_data = require("../src/page-data.json");
const { baseFolder, outputFolder} = require("./constants");

const createGulpHtAccess = function(templates) {
  const njkHtAccess = function () {
      return gulp
        .src([`${baseFolder}/htaccess/.htaccess`], { dot: true })
        .pipe(data(page_data))
        .pipe(
          nunjucksRender({
            path: [`${baseFolder}/${templates}/templates`],
            ext: "",
            envOptions: {
              autoescape: false,
            },
          })
        )
        .pipe(gulp.dest(outputFolder));
    };
  return njkHtAccess;
}

module.exports = createGulpHtAccess;