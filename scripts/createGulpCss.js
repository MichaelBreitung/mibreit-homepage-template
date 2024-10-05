const fs = require("fs");
const gulp = require("gulp");
const gulpIgnore = require("gulp-ignore");
const concat = require("gulp-concat");
const cleanCss = require("gulp-clean-css");
const sass = require("gulp-sass")(require("node-sass"));
sass.compiler = require("node-sass");

const { baseFolder, outputFolder, tempFolder } = require("./constants");

const createGulpCss = function (styles, plugins) {
  if (typeof styles !== "string" && !Array.isArray(styles)) {
    throw new Error("createGulpCss: no styles folder specified");
  }

  const createCompileScss = function (sourceFolder, destinationFolder) {
    const compileScss = function () {
      return gulp
        .src([`${baseFolder}/${sourceFolder}/styles/**/*.scss`])
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest(`${baseFolder}/${destinationFolder}/styles`));
    };
    return compileScss;
  };

  const gatherCssAndScss = function () {
    const allStyles = [];
    if (Array.isArray(styles)) {
      styles.forEach((folder) => {
        allStyles.push(`${baseFolder}/${folder}/styles/**/*.+(css|scss)`);
      });
    } else {
      allStyles.push(`${baseFolder}/${styles}/styles/**/*.+(css|scss)`);
    }

    if (Array.isArray(plugins)) {
      plugins.forEach((plugin) => {
        const stylesFolder = `${baseFolder}/plugins/${plugin}/styles`;
        if (fs.existsSync(stylesFolder)) {
          allStyles.push(`${stylesFolder}/*.+(css|scss)`);
        }
      });
    }

    return gulp.src(allStyles).pipe(gulp.dest(`${baseFolder}/${tempFolder}/styles`));
  };

  /**
   * This creates a gulp task which will take all css files from the sourceFolder and combine them
   * in the following way:
   *  1) It adds all css files starting with "-", except for the css files starting with "-*-overrides"
   *  2) It adds all css files from scripts subfolders
   *  3) It adds all css files, except the css files starting with "-" or "+" and those starting with "*-overrides"
   *  4) It adds all css files starting with "*-overrides"
   *  5) It adds all css files starting with "+", except for the css files starting with "+*-overrides"
   *  6) It adds all css files starting with "+*-overrides"
   *
   * This order is crucial to ensure the following order in the merged css file:
   *  1) All base css files -> those start with -
   *  2) All normal css files -> those have no prepended - or +
   *  3) All overrides for the base and the normal files
   *  4) All media query files
   *  5) All media query overrides
   */
  const createProcessCss = function (sourceFolder) {
    const processCss = function () {
      return gulp
        .src([
          `${baseFolder}/${sourceFolder}/styles/-*.css`,
          `!${baseFolder}/${sourceFolder}/styles/-*-overrides.css`,
          `${baseFolder}/scripts/**/*.css`,
          `${baseFolder}/${sourceFolder}/styles/!(+|-)*.css`,
          `!${baseFolder}/${sourceFolder}/styles/*-overrides.css`,
          `${baseFolder}/${sourceFolder}/styles/*-overrides.css`,
          `${baseFolder}/${sourceFolder}/styles/+*.css`,
          `!${baseFolder}/${sourceFolder}/styles/+*-overrides.css`,
          `${baseFolder}/${sourceFolder}/styles/+*-overrides.css`,
        ])
        .pipe(concat("styles.css"))
        .pipe(cleanCss({ compatibility: "ie8" }))
        .pipe(gulp.dest(`${outputFolder}/styles`));
    };
    return processCss;
  };

  const createProcessNewsletterCss = function (sourceFolder) {
    const processCss = function () {
      return gulp
        .src([
          `${baseFolder}/${sourceFolder}/styles/newsletter/-*.css`,
          `!${baseFolder}/${sourceFolder}/styles/newsletter/-*-overrides.css`,
          `${baseFolder}/${sourceFolder}/styles/newsletter/!(+|-)*.css`,
          `!${baseFolder}/${sourceFolder}/styles/newsletter/*-overrides.css`,
          `${baseFolder}/${sourceFolder}/styles/newsletter/*-overrides.css`,
          `${baseFolder}/${sourceFolder}/styles/newsletter/+*.css`,
          `!${baseFolder}/${sourceFolder}/styles/newsletter/+*-overrides.css`,
          `${baseFolder}/${sourceFolder}/styles/newsletter/+*-overrides.css`,
        ])
        .pipe(concat("styles.css"))
        .pipe(cleanCss({ compatibility: "ie8" }))
        .pipe(gulp.dest(`${outputFolder}/styles/newsletter`));
    };
    return processCss;
  };

  const processWordpressCssPlaceholder = function () {
    return gulp
      .src([`${baseFolder}/pages/blog/wp-content/themes/mibreit-photo/style.css`])
      .pipe(gulp.dest(`${outputFolder}/blog/wp-content/themes/mibreit-photo`));
  };

  return gulp.series(
    gatherCssAndScss,
    createCompileScss(tempFolder, tempFolder),
    createProcessCss(tempFolder),
    createProcessNewsletterCss(tempFolder),
    processWordpressCssPlaceholder
  );
};

module.exports = createGulpCss;
