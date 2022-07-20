const inline = require("inline-css");

const înlineNewsletterCss = function (file, enc, callback) {
  if (file.path.includes("newsletter")) {
    inline(file.contents.toString(), {url: "dist/", preserveMediaQueries: true}).then(function(newHtml){ file.contents = Buffer.from(newHtml);
      return callback(null, file);}); 
  }
  else{
    callback(null, file);
  }
  
}

module.exports = înlineNewsletterCss;