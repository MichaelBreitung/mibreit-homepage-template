const fs = require("fs");
const gulp = require("gulp");
const concat = require("gulp-concat");
const cleanCss = require("gulp-clean-css");
const sass = require("gulp-sass")(require("node-sass"));
sass.compiler = require("node-sass");

const { baseFolder, outputFolder, tempFolder } = require("./constants");

const createGulpCss = function (styles) {
  if (typeof styles !== "string" && !Array.isArray(styles)) {
    throw new Error("createGulpNoscriptCss: no styles folder specified");
  }

  const createCompileScss = function (sourceFolder, destinationFolder) {
    const compileScss = function () {
      return gulp
        .src([`${baseFolder}/${sourceFolder}/noscript-styles/**/*.scss`])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(`${baseFolder}/${destinationFolder}/noscript-styles`));
    };
    return compileScss;
  };

  const gatherCssAndScss = function () {
    const allStyles = [];
    if (Array.isArray(styles)) {
      styles.forEach((folder) => {
        allStyles.push(`${baseFolder}/${folder}/noscript-styles/**/*.+(css|scss)`);
      });
    } else {
      allStyles.push(`${baseFolder}/${styles}/noscript-styles/**/*.+(css|scss)`);
    }

    return gulp.src(allStyles).pipe(gulp.dest(`${baseFolder}/${tempFolder}/noscript-styles`));
  };

  const createProcessCss = function (sourceFolder) {
    const processCss = function () {
      return gulp
        .src([
          `${baseFolder}/${sourceFolder}/noscript-styles/-*.css`,
          `!${baseFolder}/${sourceFolder}/noscript-styles/-*-overrides.css`,
          `${baseFolder}/${sourceFolder}/noscript-styles/!(+|-)*.css`,
          `!${baseFolder}/${sourceFolder}/noscript-styles/*-overrides.css`,
          `${baseFolder}/${sourceFolder}/noscript-styles/*-overrides.css`,
          `${baseFolder}/${sourceFolder}/noscript-styles/+*.css`,
          `!${baseFolder}/${sourceFolder}/noscript-styles/+*-overrides.css`,
          `${baseFolder}/${sourceFolder}/noscript-styles/+*-overrides.css`,
        ])
        .pipe(concat("noscript.css"))
        .pipe(cleanCss({ compatibility: "ie8" }))
        .pipe(gulp.dest(`${outputFolder}/styles`));
    };
    return processCss;
  };

  return gulp.series(gatherCssAndScss, createCompileScss(tempFolder, tempFolder), createProcessCss(tempFolder));
};

module.exports = createGulpCss;
