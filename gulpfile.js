var gulp       = require( 'gulp' ),
    concat     = require( 'gulp-concat' ),
    uglify     = require( 'gulp-uglify' ),
    rename     = require( 'gulp-rename' ),
    sass       = require( 'gulp-sass' ),
    sourcemaps = require( 'gulp-sourcemaps' );

var config = {
	scripts: [
		'./assets/js/source/plugins/classie.js',
		'./assets/js/source/app.js',
		'./assets/js/source/**/*.js'
	],
	styles : [
		'./assets/css/scss/app.scss',
		'./assets/css/scss/**/*.scss'
	]
};

gulp.task( 'scripts', function () {
	return gulp.src( config.scripts )
		.pipe( concat( 'app.js' ) )
		.pipe( gulp.dest( './assets/js' ) )
		.pipe( uglify() )
		.pipe( rename( { extname: '.min.js' } ) )
		.pipe( gulp.dest( './assets/js' ) );
} );

gulp.task( 'styles', function () {
	return gulp.src( config.styles )
		.pipe( sourcemaps.init() )
		.pipe( sass.sync( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( './assets/css' ) )
		.pipe( rename( { extname: '.min.css' } ) )
		.pipe( gulp.dest( './assets/css' ) );
} );

gulp.task( 'watch', function () {
	gulp.watch( './assets/css/scss/**/*.scss', [ 'styles' ] );
	gulp.watch( './assets/js/source/**/*.js', [ 'scripts' ] );
} );

gulp.task( 'default', [ 'styles', 'scripts' ] );
