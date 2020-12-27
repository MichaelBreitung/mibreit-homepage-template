const gulp = require("gulp");
const fsExtra = require("fs-extra");

const loadVariant = require("./scripts/variantLoader");
const createGulpCss = require("./scripts/createGulpCss");
const createGulpFonts = require("./scripts/createGulpFonts");
const gulpHtAccess = require("./scripts/gulpHtAccess");
const createGulpNjkTasks = require("./scripts/createGulpNjkTasks");
const createGulpImages = require("./scripts/createGulpImages");
const createGulpJavascript = require("./scripts/createGulpJavascript");
const gulpWordpressCss = require("./scripts/gulpWordpressCss");
const gulpXml = require("./scripts/gulpXml");

const { baseFolder, tempFolder } = require("./scripts/constants");

// load variant config
const variant = loadVariant(process.argv, baseFolder);
if (!variant) {
  process.exit(1);
}

// clean temp folder
fsExtra.emptyDirSync(`${baseFolder}/${tempFolder}`);

// process gulp tasks
module.exports = { default: gulp.parallel(createGulpFonts(variant.fonts), 
  createGulpImages(variant.images, variant.favicon), 
  createGulpCss(variant.styles), 
  createGulpNjkTasks(variant.templates), 
  createGulpJavascript(), 
  /** gulpHtAccess // activate this once testing is done and you want to deploy to server */
  gulpWordpressCss,
  gulpXml) };
