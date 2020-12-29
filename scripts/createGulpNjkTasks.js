const gulp = require("gulp");
const createGulpNjkHtml = require("./createGulpNjkHtml");
const createGulpNjkPhp = require("./createGulpNjkPhp");
const createGulpNjkPhpScripts = require("./createGulpNjkPhpScripts");
const createGulpNjkHtAccess = require("./createGulpNjkHtAccess");
const createGatherNjkTemplates = require("./createGatherNjkTemplates");
const { tempFolder } = require("./constants");

const createGulpNjkTasks = function (variant, withHtAccess = false) {
  var templates = variant.templates;
  if (typeof templates !== "string" && !Array.isArray(templates)) {
    throw (new Error("createGulpHtml: no templates folder specified"));
  }

  const getHtAccessTask = function (templates) {
    if (withHtAccess) {
      return createGulpNjkHtAccess(templates)
    }
    else {
      const nothingToDo = function () {
        return Promise.resolve("getHtAccessTask: nothing to do");
      }
      return nothingToDo;
    }
  }

  if (Array.isArray(templates)) {
    return gulp.series(createGatherNjkTemplates(templates), gulp.parallel(createGulpNjkHtml(tempFolder), createGulpNjkPhp(tempFolder), createGulpNjkPhpScripts(tempFolder, variant.scripts), getHtAccessTask(tempFolder)));
  }
  else {
    return gulp.parallel(createGulpNjkHtml(templates), createGulpNjkPhp(templates), createGulpNjkPhpScripts(templates, variant.scripts), getHtAccessTask(templates));
  }
};

module.exports = createGulpNjkTasks;

