const gulp = require("gulp");
const concat = require("gulp-concat");
const cleanCss = require("gulp-clean-css");
const { baseFolder, outputFolder} = require("./constants");

const wordpressCss = function () {
  return gulp
    .src(`${baseFolder}/pages/blog/wp-content/themes/mibreit-photo/*.css`)
    .pipe(concat("style.css"))
    .pipe(cleanCss({ compatibility: "ie8" }))
    .pipe(gulp.dest(`${outputFolder}/blog/wp-content/themes/mibreit-photo`));
};

module.exports = wordpressCss;