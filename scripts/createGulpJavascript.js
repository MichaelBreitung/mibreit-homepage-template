const gulp = require("gulp");
const through2 = require("through2");
const concat = require("gulp-concat");
const minifyJs = require("./minifyJs");
const { baseFolder, outputFolder } = require("./constants");

const createGulpJavascript = function (plugins) { 
  const concatenateBaseJs = function () {
    return gulp
      .src([
        `${baseFolder}/scripts/base/mibreit-cookie-consent/*.js`,
        `${baseFolder}/scripts/base/sticky-navbar/*.js`,
        `${baseFolder}/scripts/base/hamburger-navbar/*.js`,
        `${baseFolder}/scripts/base/mibreit-navbar/*.js`,
        `${baseFolder}/scripts/base/mibreit-search/*.js`,
        `${baseFolder}/scripts/mibreit-lazy-loader/*.js`,
      ])
      .pipe(through2.obj(minifyJs))
      .pipe(concat("base.js"))
      .pipe(gulp.dest(`${outputFolder}/scripts`));
  };

  const concatenateContactJs = function () {
    return gulp
      .src([
        `${baseFolder}/scripts/mibreit-contact/mibreitFormValidator.min.js`,
        `${baseFolder}/scripts/mibreit-contact/mibreit-contact.js`,
      ])
      .pipe(through2.obj(minifyJs))
      .pipe(concat("contact.js"))
      .pipe(gulp.dest(`${outputFolder}/scripts/mibreit-contact`));
  };

  const copyGalleryJs = function () {
    return gulp
      .src([
        `${baseFolder}/scripts/mibreit-gallery/*.js`,
        `${baseFolder}/scripts/mibreit-gallery-history/*.js`,
        `${baseFolder}/scripts/mibreit-gallery-background-color/*.js`,
        `${baseFolder}/scripts/mibreit-prints/*.js`,
      ])
      .pipe(through2.obj(minifyJs))
      .pipe(concat("mibreitGalleryTs.min.js"))
      .pipe(gulp.dest(`${outputFolder}/scripts/mibreit-gallery`));
  }
  
  const pluginTasks = [concatenateBaseJs, concatenateContactJs, copyGalleryJs];
  if (Array.isArray(plugins)) {
    const createCopyPluginJs = function (pluginFolder) {
      return function() {
        return gulp
        .src(`${baseFolder}/plugins/${pluginFolder}/scripts/*.js`,)
        .pipe(through2.obj(minifyJs))
        .pipe(concat(`${pluginFolder}.min.js`))
        .pipe(gulp.dest(`${outputFolder}/scripts/${pluginFolder}`));
      }      
    } 
    plugins.forEach(function(pluginFolder) {
      pluginTasks.push(createCopyPluginJs(pluginFolder));
    });
  } 

  return gulp.parallel(pluginTasks);
};

module.exports = createGulpJavascript;
