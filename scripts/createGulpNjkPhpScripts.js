const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");
const page_data = require("../src/page-data.json");
const { baseFolder, outputFolder } = require("./constants");

const createGulpPhpScripts = function (templates, plugins) {
  if (typeof templates !== "string") {
    throw new Error("createGulpPhpScripts: no templates folder specified");
  }

  const source = [`${baseFolder}/scripts/**/*.php`];

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
  };

  const tasks = [njkPhpScripts];
  if (Array.isArray(plugins)) {
    const createPhpPluginScripts = function (pluginFolder) {
      return function () {
        return gulp
          .src(`${baseFolder}/plugins/${pluginFolder}/scripts/*.php`)
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
          .pipe(gulp.dest(`${outputFolder}/scripts/${pluginFolder}`));
      };
    };

    plugins.forEach(function (pluginFolder) {
      tasks.push(createPhpPluginScripts(pluginFolder));
    });

    // copy the vendor folder if php dependencies are installed by the plugins
    tasks.push(function () {
      return gulp.src(`${baseFolder}/plugins/vendor/**/*.*`).pipe(gulp.dest(`${outputFolder}/scripts/vendor`));
    });
  }

  return gulp.parallel(tasks);
};

module.exports = createGulpPhpScripts;
