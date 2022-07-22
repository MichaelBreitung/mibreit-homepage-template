const inline = require("inline-css");
const path = require('path');

const înlineNewsletterCss = function (file, enc, callback) {
  if (file.path.includes("newsletter")) {
    const basePath = path.normalize(`${__dirname}/../dist/`);
    inline(file.contents.toString(), {url: `file://${basePath}`, preserveMediaQueries: true}).then(function(newHtml){ file.contents = Buffer.from(newHtml);
      return callback(null, file);}); 
  }
  else{
    callback(null, file);
  }  
}

module.exports = înlineNewsletterCss;