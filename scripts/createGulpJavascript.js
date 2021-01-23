const gulp = require("gulp");
const through2 = require("through2");
const concat = require("gulp-concat");
const minifyJs = require("./minifyJs");
const { baseFolder, outputFolder } = require("./constants");

const createGulpJavascript = function () {
  const concatenateBaseJs = function () {
    return gulp
      .src([
        `${baseFolder}/scripts/base/jquery/*.min.js`,
        `${baseFolder}/scripts/base/mibreit-cookie-consent/*.min.js`,
        `${baseFolder}/scripts/base/sticky-navbar/*.js`,
        `${baseFolder}/scripts/base/hamburger-navbar/*.js`,
        `${baseFolder}/scripts/base/mibreit-navbar/*.js`,
        `${baseFolder}/scripts/base/mibreit-search/*.js`,
        `${baseFolder}/scripts/mibreit-lazy-loader/*.js`
      ])
      .pipe(through2.obj(minifyJs))
      .pipe(concat("base.js"))
      .pipe(gulp.dest(`${outputFolder}/scripts`));
  };

  const concatenateContactJs = function () {
    return gulp
      .src([
        `${baseFolder}/scripts/contact/jquery-validate/*.min.js`,
        `${baseFolder}/scripts/contact/mibreit-contact/*.js`,
      ])
      .pipe(through2.obj(minifyJs))
      .pipe(concat("contact.js"))
      .pipe(gulp.dest(`${outputFolder}/scripts/contact`));
  };

  const copyGalleryJs = function () {
    return gulp
      .src([
        `${baseFolder}/scripts/mibreit-gallery/*.js`,
        `${baseFolder}/scripts/mibreit-gallery-history/*.js`,
        `${baseFolder}/scripts/mibreit-prints/*.js`,
      ])
      .pipe(through2.obj(minifyJs))
      .pipe(concat("mibreitGallery.min.js"))
      .pipe(gulp.dest(`${outputFolder}/scripts/mibreit-gallery`));
  };

  return gulp.parallel(concatenateBaseJs,
    concatenateContactJs,
    copyGalleryJs)
}

module.exports = createGulpJavascript;