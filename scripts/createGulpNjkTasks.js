const fs = require('fs');
const gulp = require('gulp');
const createGulpNjkHtml = require('./createGulpNjkHtml');
const createGulpNjkPhp = require('./createGulpNjkPhp');
const createGulpNjkAffiliates = require('./createGulpNjkAffiliates');
const createGulpXml = require('./createGulpXml');
const createGulpNjkPhpScripts = require('./createGulpNjkPhpScripts');
const createGulpNjkHtAccess = require('./createGulpNjkHtAccess');
const createGulpNjkRobots = require('./createGulpNjkRobots');
const createGatherNjkTemplates = require('./createGatherNjkTemplates');
const { tempFolder, baseFolder } = require('./constants');

const createGulpNjkTasks = function (variant, withHtAccess = false) {
  let templates = variant.templates;
  if (typeof templates !== 'string' && !Array.isArray(templates)) {
    throw new Error('createGulpHtml: no templates folder specified');
  }

  if (typeof templates === 'string') {
    templates = [templates];
  }

  if (Array.isArray(variant.plugins)) {
    variant.plugins.forEach((plugin) => {
      const templatesFolder = `plugins/${plugin}`;
      if (fs.existsSync(`${baseFolder}/${templatesFolder}`)) {
        templates.push(templatesFolder);
      }
    });
  }

  const getHtAccessTask = function (templates) {
    if (withHtAccess) {
      return createGulpNjkHtAccess(templates);
    } else {
      const nothingToDo = function () {
        return Promise.resolve('getHtAccessTask: nothing to do');
      };
      return nothingToDo;
    }
  };

  return gulp.series(
    createGatherNjkTemplates(templates),
    gulp.parallel(
      createGulpNjkHtml(tempFolder),
      createGulpNjkPhp(tempFolder),
      createGulpNjkPhpScripts(tempFolder, variant.scripts),
      createGulpNjkRobots(tempFolder),
      getHtAccessTask(tempFolder),      
      createGulpXml(tempFolder),
      createGulpNjkAffiliates(tempFolder)
    )
  );
};

module.exports = createGulpNjkTasks;
