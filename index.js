var express = require( 'express' );
var data = require( './boris.json' );
var settings = require( './settings.json' );

var React = require( 'react' );
var ReactDOMServer = require( 'react-dom/server' );

var jspm = require( 'jspm' );
jspm.setPackagePath( './' );

var app = express();

app.set( 'view engine', 'html' );
app.set( 'views', __dirname + '/views' );
app.enable( 'view cache' );
app.engine( 'html', require( 'hogan-express' ));
app.use( require( 'express-autoprefixer' )( { browsers: 'last 2 versions', cascade: false } )).use( express.static( __dirname + '/assets' ));

var dataJSon = JSON.stringify( data );


jspm.import( 'js/app' ).then( function( App ) {
  App = React.createFactory( App.default );
  var html = ReactDOMServer.renderToString( App( {
    data: data,
    onCopyReady: function() {}
  } ));

  function route( req, res ) {
    res.locals.json = dataJSon;
    res.locals.dev = ( settings.env === 'dev' );
    res.locals.DOM = html;

    res.render( 'index' );
  }

  app.get( '/:pattern?', route );
  var server = app.listen( settings.port );
} );
