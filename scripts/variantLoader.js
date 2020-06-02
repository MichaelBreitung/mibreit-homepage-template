const fs = require("fs");

const variantConfigFileName = "config.json";
const baseVariantSubFolder = "variant-base";

function variantPathFromArgv(argv, baseFolder) {
  if (argv.length >= 4 && argv[2] === "--variant") {
    return `./${baseFolder}/variant-${argv[3]}`;
  } else {
    return null;
  }
}

function loadVariantConfigFromPath(path) {
  const configPath = `${path}/${variantConfigFileName}`;
  if (fs.existsSync(configPath)) {
    console.info("Reading variant config from", configPath);
    const config = fs.readFileSync(configPath, "utf8");
    return JSON.parse(config);
  } else {
    console.error("No variant config at location:", configPath);
    return null;
  }
}

module.exports = function (argv, baseFolder) {
  const baseVariantFolder = `./${baseFolder}/${baseVariantSubFolder}`;
  const variantPath = variantPathFromArgv(argv, baseFolder);
  if (!variantPath) {
    return loadVariantConfigFromPath(baseVariantFolder);
  } else {
    return loadVariantConfigFromPath(variantPath);
  }
};
