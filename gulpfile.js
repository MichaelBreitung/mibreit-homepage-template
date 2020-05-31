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

function prettyGulp(file, enc, callback) {
  file.contents = Buffer.from(pretty(file.contents.toString(), { ocd: true }));
  callback(null, file);
}

// html / php tasks
gulp.task("nunjucks-php", function () {
  return gulp
    .src("src/pages/**/*.php")
    .pipe(data(page_data))
    .pipe(
      nunjucksRender({
        path: ["src/templates"],
        ext: ".php",
        envOptions: {
          autoescape: false,
          trimBlocks: true,
          lstripBlocks: true,
        },
      })
    )
    .pipe(through2.obj(prettyGulp))
    .pipe(gulp.dest("dist"));
});

gulp.task("nunjucks-html", function () {
  return gulp
    .src("src/pages/**/*.html")
    .pipe(data(page_data))
    .pipe(
      nunjucksRender({
        path: ["src/templates"],
        envOptions: {
          autoescape: false,
          trimBlocks: true,
          lstripBlocks: true,
        },
      })
    )
    .pipe(through2.obj(prettyGulp))
    .pipe(gulp.dest("dist"));
});

// css tasks
gulp.task("create-clean-css", function () {
  return gulp
    .src(["src/styles/*.css", "src/scripts/**/*.css"])
    .pipe(concat("styles.css"))
    .pipe(cleanCss({ compatibility: "ie8" }))
    .pipe(gulp.dest("dist/styles"));
});

// javascript tasks
gulp.task("concatenate-base-javascript", function () {
  return gulp
    .src(["src/scripts/base/jquery/*.js", "src/scripts/base/mibreit-cookie-consent/*.js"])
    .pipe(concat("base.js"))
    .pipe(gulp.dest("dist/scripts"));
});

gulp.task("concatenate-javascript", function () {
  return gulp
    .src(["src/scripts/contact/jquery-validate/*.js", "src/scripts/contact/mibreit-contact/*.js"])
    .pipe(concat("contact.js"))
    .pipe(gulp.dest("dist/scripts"));
});

gulp.task("copy-mibreit-gallery-javascript", function () {
  return gulp
    .src("src/scripts/mibreit-gallery/*.js")
    .pipe(gulp.dest("dist/scripts/mibreit-gallery"));
});

// images tasks

gulp.task("copy-images", function () {
  return gulp.src("src/images/**/*.+(jpg|png|gif)").pipe(gulp.dest("dist/images"));
});

gulp.task("copy-mibreit-gallery-images", function () {
  return gulp
    .src("src/scripts/mibreit-gallery/images/*.+(jpg|png|gif)")
    .pipe(gulp.dest("dist/scripts/mibreit-gallery/images"));
});

// additional copy tasks
gulp.task("copy-mibreit-gallery-php", function () {
  return gulp
    .src(["src/scripts/mibreit-gallery/mibreit-gallery.php"])
    .pipe(gulp.dest("dist/scripts/mibreit-gallery"));
});

gulp.task(
  "default",
  gulp.parallel(
    "nunjucks-html",
    "nunjucks-php",
    "create-clean-css",
    "concatenate-base-javascript",
    "concatenate-javascript",
    "copy-mibreit-gallery-javascript",
    "copy-mibreit-gallery-php",
    "copy-images",
    "copy-mibreit-gallery-images"
  )
);
