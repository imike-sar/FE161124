import gulp from 'gulp';
import browserify from 'browserify';
import through from 'through2';
import eslint from 'gulp-eslint';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import csso from 'gulp-csso';
import stylelint from 'gulp-stylelint';
import plumber from 'gulp-plumber';

import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';
import pimport from 'postcss-import';

gulp.task('default', ['build-js', 'build-css'], () => {
});

function makeBundle() {
  return through.obj(function (file, enc, done) {
    const bundle = browserify(file.path);

    bundle
      .transform('babelify', {presets: ['es2015']})
      .bundle((err, res) => {
        if (err) {
          file.contents = null;
        } else {
          file.contents = res;
        }

        done(err, file);
      });
  });
}

gulp.task('build-js', () => {
  gulp.src(['./scripts/*.js'])
    .pipe(plumber())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(makeBundle())
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('build-css', () => {
  gulp.src([
    './styles/ress.min.css',
    './styles/goods.css',
    './styles/style.css'
  ])
    .pipe(plumber())
    .pipe(stylelint({
      reporters: [
        {formatter: 'string', console: true}
      ]
    }))
    .pipe(postcss([
      pimport(),
      cssnext({
        browsers: ['last 5 versions', 'ie 8-11']
      })
    ]))
    .pipe(concat('bundle.css'))
    .pipe(csso())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
  gulp.watch('./scripts/**/*.js', ['build-js']);
  gulp.watch('./styles/**/*.css', ['build-css']);
});
