const gulp = require("gulp");
const fsExtra = require("fs-extra");

const loadVariant = require("./scripts/variantLoader");
const createGulpCss = require("./scripts/createGulpCss");
const createGulpFonts = require("./scripts/createGulpFonts");
const createGulpNjkTasks = require("./scripts/createGulpNjkTasks");
const createGulpImages = require("./scripts/createGulpImages");
const createGulpJavascript = require("./scripts/createGulpJavascript");

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
  createGulpCss(variant.styles, variant.plugins), 
  createGulpNjkTasks(variant), //, true), // comment in second parameter true, to also create .htaccess before deploy
  createGulpJavascript(variant.plugins)) };
