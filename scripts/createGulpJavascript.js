const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");

const through2 = require("through2");
const concat = require("gulp-concat");
const minifyJs = require("./minifyJs");
const loadPluginConfigFromPath = require("./pluginConfigLoader");
const { baseFolder, outputFolder } = require("./constants");
const page_data = require("../src/page-data.json");

const createGulpJavascript = function (plugins) {
  const concatenateBaseJs = function () {
    return gulp
      .src([
        `${baseFolder}/scripts/base/google/tagManager.js`,
        `${baseFolder}/scripts/base/mibreit-cookie-consent/mibreitCookieConsent.min.js`,
        `${baseFolder}/scripts/base/mibreit-cookie-consent/mibreitCookie.js`,
        `${baseFolder}/scripts/base/hamburger-navbar/*.js`,
        `${baseFolder}/scripts/base/mibreit-search/*.js`,
        `${baseFolder}/scripts/mibreit-lazy-loader/scripts/*.js`,
      ])
      .pipe(data(page_data))
      .pipe(
        nunjucksRender({
          ext: ".js",
          envOptions: {
            autoescape: false,
            trimBlocks: true,
            lstripBlocks: true,
            throwOnUndefined: true,
          },
        })
      )
      .pipe(through2.obj(minifyJs))
      .pipe(concat("base.js"))
      .pipe(gulp.dest(`${outputFolder}/scripts`));
  };

  const jsTasks = [concatenateBaseJs];

  if (Array.isArray(plugins)) {
    const createCopyPluginJs = function (pluginFolder) {
      const config = loadPluginConfigFromPath(`${baseFolder}/plugins/${pluginFolder}`);

      if (config && config.jsorder && Array.isArray(config.jsorder)) {
        const scripts = [];
        config.jsorder.forEach((file) => {
          scripts.push(`${baseFolder}/plugins/${pluginFolder}/scripts/${file}`);
        });

        return function () {
          return gulp
            .src(scripts)
            .pipe(through2.obj(minifyJs))
            .pipe(concat(`${pluginFolder}.min.js`))
            .pipe(gulp.dest(`${outputFolder}/scripts/${pluginFolder}`));
        };
      } else {
        return function () {
          return gulp
            .src(`${baseFolder}/plugins/${pluginFolder}/scripts/*.js`)
            .pipe(through2.obj(minifyJs))
            .pipe(concat(`${pluginFolder}.min.js`))
            .pipe(gulp.dest(`${outputFolder}/scripts/${pluginFolder}`));
        };
      }
    };

    plugins.forEach(function (pluginFolder) {
      jsTasks.push(createCopyPluginJs(pluginFolder));
    });
  }

  return gulp.parallel(jsTasks);
};

module.exports = createGulpJavascript;
