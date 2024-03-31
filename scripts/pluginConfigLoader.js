const fs = require("fs");

const variantConfigFileName = "config.json";

module.exports = function loadPluginConfigFromPath(path) {
  const configPath = `${path}/${variantConfigFileName}`;
  if (fs.existsSync(configPath)) {
    console.info("Reading plugin config from", configPath);
    const config = fs.readFileSync(configPath, "utf8");
    return JSON.parse(config);
  } else {
    console.error("No plugin config at location:", configPath);
    return null;
  }
};
