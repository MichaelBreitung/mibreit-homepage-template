const fs = require('fs');
const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');

const { baseFolder, outputFolder, tempFolder } = require('./constants');

const createGulpCss = function (styles, plugins) {
  if (typeof styles !== 'string' && !Array.isArray(styles)) {
    throw new Error('createGulpCss: no styles folder specified');
  }

  const createCompileScss = function (sourceFolder, destinationFolder) {
    const compileScss = function () {
      return gulp
        .src([`${baseFolder}/${sourceFolder}/styles/*.scss`])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`${baseFolder}/${destinationFolder}/styles`));
    };
    return compileScss;
  };

  const gatherCssAndScss = function () {
    const allStyles = [`${baseFolder}/pages/blog/wp-content/themes/mibreit-photo/*.scss`];
    if (Array.isArray(styles)) {
      styles.forEach((folder) => {
        allStyles.push(`${baseFolder}/${folder}/styles/*.+(css|scss)`);
      });
    } else {
      allStyles.push(`${baseFolder}/${styles}/styles/*.+(css|scss)`);
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

  const createProcessCss = function (sourceFolder) {
    const processCss = function () {
      return gulp
        .src([
          `${baseFolder}/${sourceFolder}/styles/-*.css`,
          `!${baseFolder}/${sourceFolder}/styles/-*-overrides.css`,
          `${baseFolder}/${sourceFolder}/styles/-*-overrides.css`,
          `${baseFolder}/scripts/**/*.css`,
          `${baseFolder}/${sourceFolder}/styles/!(+|-)*.css`,
          `!${baseFolder}/${sourceFolder}/styles/*-overrides.css`,
          `${baseFolder}/${sourceFolder}/styles/*-overrides.css`,
          `${baseFolder}/${sourceFolder}/styles/+*.css`,
          `!${baseFolder}/${sourceFolder}/styles/+*-overrides.css`,
          `${baseFolder}/${sourceFolder}/styles/+*-overrides.css`,
        ])
        .pipe(concat('styles.css'))
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(gulp.dest(`${outputFolder}/styles`));
    };
    return processCss;
  };

  const processWordpressCssPlaceholder = function () {
    return gulp.src([`${baseFolder}/pages/blog/wp-content/themes/mibreit-photo/style.css`]).pipe(gulp.dest(`${outputFolder}/blog/wp-content/themes/mibreit-photo`));
  };

  return gulp.series(
    gatherCssAndScss,
    createCompileScss(tempFolder, tempFolder),
    createProcessCss(tempFolder),
    processWordpressCssPlaceholder
  );
};

module.exports = createGulpCss;
