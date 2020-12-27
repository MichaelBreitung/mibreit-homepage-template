const gulp = require("gulp");

const loadVariant = require("./scripts/variantLoader");
const createGulpCss = require("./scripts/createGulpCss");
const createGulpFonts = require("./scripts/createGulpFonts");
const gulpHtAccess = require("./scripts/gulpHtAccess");
const createGulpHtml = require("./scripts/createGulpHtml");
const createGulpImages = require("./scripts/createGulpImages");
const createGulpJavascript = require("./scripts/createGulpJavascript");
const createGulpPhp = require("./scripts/createGulpPhp");
const createGulpPhpScripts = require("./scripts/createGulpPhpScripts");
const gulpWordpressCss = require("./scripts/gulpWordpressCss");
const gulpXml = require("./scripts/gulpXml");

const { baseFolder } = require("./scripts/constants");

const variant = loadVariant(process.argv, baseFolder);
if (!variant) {
  process.exit(1);
}

module.exports = { default: gulp.parallel(createGulpFonts(variant), 
  createGulpImages(variant), 
  createGulpCss(variant), 
  createGulpHtml(variant), 
  createGulpJavascript(variant),
  createGulpPhp(variant), 
  createGulpPhpScripts(variant), 
  /** gulpHtAccess // activate this once testing is done and you want to deploy to server */
  gulpWordpressCss,
  gulpXml) };
