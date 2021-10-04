# Homepage Template Plugins

The Homepage Template supports plugins, which will either be delivered as a zip file or downloaded from github. Those Plugins contain a folder structure that is similar to the folder structure of the *variants*. In addition to a *styles* and *templates* folder they usually also contain a *scripts* folder, which contains special scripts that are used by the plugin.

**Note:** It's the responsibility of the plugin author to ensure that the naming of the scripts, styles and macros use a unique naming scheme to avoid colisions with the naming that's used in the homepage template. In case you use a plugin and get errors when running gulp, first check if deactivating the plugin solves it.

## Plugin Installation

Just extract the zip file into this folder. Make sure that the *styles*, *templates* and *script* folders of the plugin are contained as sub-folders in the plugin folder.

Example structure for *mibreit-slider*:
````
src/
  |-plugins/
    |-mibreit-slider/
      |-scripts/
      |-styles/
      |-templates/
````

## Plugin Activation

In order to use the templates and macros that are provided via a plugin, you have to activate it. This can be done via the *config.json* file in your *variant*.

To stay with the *mibreit-slider* example, here's the *config.json* you would use to activate it.

````
{
  "images": ["variant-base", "variant-custom"],
  "styles": ["variant-base", "variant-custom"],
  "templates": ["variant-base", "variant-custom"],
  "favicon": "variant-custom",
  "plugins" : ["mibreit-slider"]
}
````

**Note:** You can use multiple plugins by providing a comma separated list here.

## Plugin Usage

You can use plugins the same way as you would use other templates and macros that are already contained inside of the variants. Gulp will take care of packaging everything together properly.

