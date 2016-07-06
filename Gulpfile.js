var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');

gulp.task('scripts', function(){
	return gulp.src('client/*.js')
		.pipe(rename({suffix: '.min'}))
		.pipe(uglify())
		.pipe(concat('client/*.js'))
		.pipe(gulp.dest('js'));
});

gulp.task('watch', function(){
	gulp.watch('client/*.js', ['scripts']);
});

gulp.task('default', ['scripts']);