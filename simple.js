var express = require( 'express' );
var data = require( './boris.json' );
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
  res.locals.json = dataJSon;
  res.locals.about = about;
  res.locals.dev = ( settings.env === 'dev' );

  res.render( 'index' );
}

app.get( '/:pattern?', route );
app.get( '/:pattern/gif', route );
var server = app.listen( settings.port );
