const pretty = require("pretty");

const prettyHtml = function (file, enc, callback) {
  const prettyString = pretty(file.contents.toString(), { ocd: true });
  const trimmedString = prettyString.replace(/^ +/gm, "");
  file.contents = Buffer.from(trimmedString);
  callback(null, file);
};

module.exports = prettyHtml;
