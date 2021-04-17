const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");
const page_data = require("../src/page-data.json");
const { baseFolder, outputFolder} = require("./constants");

const createGulpAffiliates = function(templates) {
  const njkAffiliates = function () {
      return gulp
        .src(`${baseFolder}/scripts/affiliate/affiliate_banner.php`)
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
        .pipe(gulp.dest(`${outputFolder}/scripts/affiliate`));
    };
  return njkAffiliates;
}

module.exports = createGulpAffiliates;