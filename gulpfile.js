var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify-es').default,
    rename = require('gulp-rename'),
    clone = require('gulp-clone'),
    include = require("gulp-include"),
	imagemin = require('gulp-imagemin'),
	del = require('del'),
    browserSync = require('browser-sync').create();

gulp.task('scss', () => {
    return gulp.src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('dist/static/css'))
        .pipe(browserSync.stream())
        .pipe(clone())
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/static/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', () => {
    return gulp.src('src/js/scripts.js')
        .pipe(include())
        .on('error', console.log)
        .pipe(gulp.dest('dist/static/js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/static/js'));
});

gulp.task('html', () => {
	return gulp.src('src/html/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('img', () => {
	return gulp.src('src/img/**/*')
		.pipe(imagemin([
		    imagemin.mozjpeg({quality: 75, progressive: true}),
		    imagemin.optipng({optimizationLevel: 3}),
		    imagemin.svgo({
		        plugins: [
					{cleanupIDs: false},
					{removeUselessDefs: false}
		        ]
		    })
		]))
		.pipe(gulp.dest('dist/static/img'));
});

gulp.task('fonts', () => {
	return gulp.src('src/fonts/**/*{woff,woff2}')
        .pipe(gulp.dest('dist/static/fonts'));
});

gulp.task('del', () => {
	return del('dist');
});


gulp.task('serve', () => {
	browserSync.init({
        server: "./dist"
    });

    gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
	gulp.watch('src/html/**/*.html', gulp.series('html'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));

	gulp.watch('dist/**/*.js').on('change', browserSync.reload);
	gulp.watch('dist/**/*.html').on('change', browserSync.reload);
});

gulp.task('build', gulp.series(
	'del',
	'scss',
	'html',
	'js',
	'img',
	'fonts'
));

gulp.task('default', gulp.series(
	'build',
	'serve'
));
