var express = require( 'express' );
var requiredir = require( 'requiredir' );
var data = requiredir( './data' );
delete data.length;

var settings = require( './settings.json' );
var fs = require( 'fs' );
var marked = require( 'marked' );

var app = express();

app.set( 'view engine', 'html' );
app.set( 'views', __dirname + '/views' );
app.enable( 'view cache' );
app.engine( 'html', require( 'hogan-express' ));
app.use( require( 'express-autoprefixer' )( { browsers: 'last 2 versions', cascade: false } )).use( express.static( __dirname + '/assets' ));

var dataJSon = JSON.stringify( data );
var about = marked( fs.readFileSync( './about.md', { encoding: 'utf8' } ));

function route( req, res ) {

  global.navigator = { userAgent: req.headers[ 'user-agent' ] };
  res.locals.title = data[ req.params.category ].title;
  res.locals.domain = req.protocol + '://' + req.get( 'host' );
  res.locals.category = req.params.category;
  res.locals.url = res.locals.domain;
  res.locals.json = dataJSon;
  res.locals.about = about;
  res.locals.dev = ( settings.env === 'dev' );

  res.render( 'index' );
}
app.get( '/', function( req, res ) {
  res.redirect( '/' + Object.keys( data )[ 0 ] );
} );
app.get( '/:category/:pattern?', route );
app.get( '/:category/:pattern/gif', route );
app.listen( settings.port );
