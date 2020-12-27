const gulp = require("gulp");
const { baseFolder, tempFolder } = require("./constants");

const createGatherNjkTemplates = function (templates) {
  if (!Array.isArray(templates)) {
    throw (new Error("createGatherNjkTemplates: no templates array specified"));
  }
  
  const gatherTemplates = function () {
    return gulp
      .src(templates.map((folder) => `${baseFolder}/${folder}/templates/**/*.+(njk|svg)`))
      .pipe(gulp.dest(`${baseFolder}/${tempFolder}/templates`));
  };

  return gatherTemplates;
};

module.exports = createGatherNjkTemplates;