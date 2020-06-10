const gulp = require("gulp");

// html templates
const nunjucksRender = require("gulp-nunjucks-render");
const data = require("gulp-data");
const page_data = require("./src/page-data.json");
const through2 = require("through2");
const pretty = require("pretty");

// css
const concat = require("gulp-concat");
const cleanCss = require("gulp-clean-css");

// helpers
const loadVariant = require("./scripts/variantLoader");

const outputFolder = "dist";
const baseFolder = "src";
const variant = loadVariant(process.argv, baseFolder);
if (!variant) {
  process.exit(1);
}

function prettyGulp(file, enc, callback) {
  const prettyString = pretty(file.contents.toString(), { ocd: true });
  const trimmedString = prettyString.replace(/^ +/gm, "");
  file.contents = Buffer.from(trimmedString);
  callback(null, file);
}

// html / php tasks
gulp.task("nunjucks-php", function () {
  return gulp
    .src(`${baseFolder}/pages/**/*.php`)
    .pipe(data(page_data))
    .pipe(
      nunjucksRender({
        path: [`${baseFolder}/${variant.templates}/templates`],
        ext: ".php",
        envOptions: {
          autoescape: false,
          trimBlocks: true,
          lstripBlocks: true,
        },
      })
    )
    .pipe(through2.obj(prettyGulp))
    .pipe(gulp.dest(outputFolder));
});

gulp.task("nunjucks-html", function () {
  return gulp
    .src(`${baseFolder}/pages/**/*.html`)
    .pipe(data(page_data))
    .pipe(
      nunjucksRender({
        path: [`${baseFolder}/${variant.templates}/templates`],
        envOptions: {
          autoescape: false,
          trimBlocks: true,
          lstripBlocks: true,
        },
      })
    )
    .pipe(through2.obj(prettyGulp))
    .pipe(gulp.dest(outputFolder));
});

gulp.task("nunjucks-php-scripts", function () {
  return gulp
    .src([`${baseFolder}/scripts/**/*.php`])
    .pipe(data(page_data))
    .pipe(
      nunjucksRender({
        path: [`${baseFolder}/${variant.templates}/templates`],
        ext: ".php",
        envOptions: {
          autoescape: false,
        },
      })
    )
    .pipe(gulp.dest(`${outputFolder}/scripts`));
});

gulp.task("nunjucks-htaccess", function () {
  return gulp
    .src([`${baseFolder}/htaccess/.htaccess`], { dot: true })
    .pipe(data(page_data))
    .pipe(
      nunjucksRender({
        path: [`${baseFolder}/templates`],
        ext: "",
        envOptions: {
          autoescape: false,
        },
      })
    )
    .pipe(gulp.dest(outputFolder));
});

// css tasks
gulp.task("create-clean-css", function () {
  return gulp
    .src([`${baseFolder}/${variant.styles}/styles/*.css`, `${baseFolder}/scripts/**/*.css`])
    .pipe(concat("styles.css"))
    .pipe(cleanCss({ compatibility: "ie8" }))
    .pipe(gulp.dest(`${outputFolder}/styles`));
});

// javascript tasks
gulp.task("concatenate-base-javascript", function () {
  return gulp
    .src([
      `${baseFolder}/scripts/base/jquery/*.js`,
      `${baseFolder}/scripts/base/mibreit-cookie-consent/*.js`,
    ])
    .pipe(concat("base.js"))
    .pipe(gulp.dest(`${outputFolder}/scripts`));
});

gulp.task("concatenate-contact-javascript", function () {
  return gulp
    .src([
      `${baseFolder}/scripts/contact/jquery-validate/*.js`,
      `${baseFolder}/scripts/contact/mibreit-contact/*.js`,
    ])
    .pipe(concat("contact.js"))
    .pipe(gulp.dest(`${outputFolder}/scripts/contact`));
});

gulp.task("copy-mibreit-gallery-javascript", function () {
  return gulp
    .src(`${baseFolder}/scripts/mibreit-gallery/*.js`)
    .pipe(gulp.dest(`${outputFolder}/scripts/mibreit-gallery`));
});

// images tasks

gulp.task("copy-images", function () {
  if (Array.isArray(variant.images)) {
    return gulp
      .src(variant.images.map((folder) => `${baseFolder}/${folder}/images/**/*.+(jpg|png|gif)`))
      .pipe(gulp.dest(`${outputFolder}/images`));
  } else {
    return gulp
      .src(`${baseFolder}/${variant.images}/images/**/*.+(jpg|png|gif)`)
      .pipe(gulp.dest(`${outputFolder}/images`));
  }
});

gulp.task("copy-mibreit-gallery-images", function () {
  return gulp
    .src(`${baseFolder}/scripts/mibreit-gallery/images/*.+(jpg|png|gif)`)
    .pipe(gulp.dest(`${outputFolder}/scripts/mibreit-gallery/images`));
});

gulp.task("copy-favicon", function () {
  return gulp
    .src(`${baseFolder}/${variant.favicon}/images/favicon.ico`)
    .pipe(gulp.dest(outputFolder));
});

// wordpress specific
gulp.task("copy-wordpress-images", function () {
  return gulp
    .src(`${baseFolder}/pages/blog/wp-content/themes/mibreit-photo/**/*.+(jpg|png|gif)`)
    .pipe(gulp.dest(`${outputFolder}/blog/wp-content/themes/mibreit-photo`));
});

gulp.task("create-clean-css-wordpress", function () {
  return gulp
    .src(`${baseFolder}/pages/blog/wp-content/themes/mibreit-photo/*.css`)
    .pipe(concat("styles.css"))
    .pipe(cleanCss({ compatibility: "ie8" }))
    .pipe(gulp.dest(`${outputFolder}/blog/wp-content/themes/mibreit-photo`));
});

// parallel execution of all tasks
gulp.task(
  "default",
  gulp.parallel(
    "nunjucks-html",
    "nunjucks-php",
    "nunjucks-php-scripts",
    // "nunjucks-htaccess",
    "create-clean-css",
    "concatenate-base-javascript",
    "concatenate-contact-javascript",
    "copy-mibreit-gallery-javascript",
    "copy-images",
    "copy-mibreit-gallery-images",
    "copy-favicon",
    "copy-wordpress-images",
    "create-clean-css-wordpress"
  )
);
