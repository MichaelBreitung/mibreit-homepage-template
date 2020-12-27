const gulp = require("gulp");
const createGulpNjkHtml = require("./createGulpNjkHtml");
const createGulpNjkPhp = require("./createGulpNjkPhp");
const createGulpNjkPhpScripts = require("./createGulpNjkPhpScripts");
const createGatherNjkTemplates = require("./createGatherNjkTemplates");
const {tempFolder } = require("./constants");

const createGulpNjkTasks = function (templates) {
  if (typeof templates !== "string" && !Array.isArray(templates)) {
    throw (new Error("createGulpHtml: no templates folder specified"));
  }

  if (Array.isArray(templates)) {
    return gulp.series(createGatherNjkTemplates(templates), gulp.parallel(createGulpNjkHtml(tempFolder), createGulpNjkPhp(tempFolder, createGulpNjkPhpScripts(tempFolder))));
  }
  else {
    return gulp.parallel(createGulpNjkHtml(templates), createGulpNjkPhp(templates, createGulpNjkPhpScripts(templates)));
  }
};

module.exports = createGulpNjkTasks;

