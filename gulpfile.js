// Plugins
const {
  parallel,
  series,
  watch,
  src,
  dest,
} = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel');
const gcmq = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const smartgrid = require('smart-grid');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

// Globs
const config = {
  root: './dev/',
  html: {
    src: 'index.html',
    dest: './prod/',
  },
  css: {
    src: 'less/+(styles).less',
    watch: 'less/**/*.less',
    dest: './prod/css',
  },
  js: {
    src: 'js/+(common).mjs',
    watch: 'js/**/*.mjs',
    dest: './prod/js',
  },
};

/**
 * Compile pug to html
 *
 * @return {string} Return file's paths
 */
function html() {
  return src(config.root + config.html.src)
      .pipe(dest(config.html.dest));
}

/**
 * Compile less to css
 *
 * @return {string} Return file's paths
 */
function css() {
  return src(config.root + config.css.src)
      .pipe(less())
      .pipe(gcmq())
      .pipe(dest(config.css.dest))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
      }))
      .pipe(cleanCSS({
        level: 2,
      }))
      .pipe(rename({
        extname: '.min.css',
      }))
      .pipe(dest(config.css.dest))
      .pipe(browserSync.stream());
}

/**
 * Save js to prod directory
 *
 * @return {string} Return file's paths
 */
function js() {
  return src(config.root + config.js.src)
      .pipe(dest(config.js.dest))
      .pipe(babel())
      .pipe(uglify({
        toplevel: true,
      }))
      .pipe(rename({
        extname: '.js',
      }))
      .pipe(dest(config.js.dest));
}

/**
 * Initialize smart-grid library
 *
 * @param {*} done End async function
 */
function grid(done) {
  smartgrid('./dev/less', {
    container: {
      maxWidth: '1024px',
    },
  });
  done();
}

/**
 * Initialize live reload
 *
 * @param {*} done End async function
 */
function livereload(done) {
  browserSync.init({
    server: {
      baseDir: './prod/',
    },
  });

  done();
}

/**
 * Task's assignment
 */
exports.html = html;
exports.css = css;
exports.grid = grid;
// Build final bundle from pug (html), less, js
exports.build = parallel(html, css, js);
// Watch changes from pug (html), less, js
exports.watch = series(parallel(html, css, js), livereload,
    function() {
      watch(config.root + config.html.src, series(html, function(done) {
        browserSync.reload();

        done();
      }));

      watch(config.root + config.css.watch, css);


      watch(config.root + config.js.watch, series(js, function(done) {
        browserSync.reload();

        done();
      }));
    });
