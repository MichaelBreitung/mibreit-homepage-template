const uglifyJs = require("uglify-js");

const minifyJs = function(file, enc, callback) {
  if (!file.path.endsWith(".min.js")) {
    file.contents = Buffer.from(uglifyJs.minify(file.contents.toString()).code);
  }
  callback(null, file);
}

module.exports = minifyJs;
