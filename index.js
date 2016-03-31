var express = require( 'express' );
var data = require( './boris.json' );
var settings = require( './settings.json' );
var fs = require( 'fs' );
var marked = require( 'marked' );
var hotload = require( 'hotload' );
var React = require( 'react' );
var ReactDOMServer = require( 'react-dom/server' );
var getYouTubeID = require( 'get-youtube-id' );

var jspm = require( 'jspm' );
jspm.setPackagePath( './' );

var app = express();

app.set( 'view engine', 'html' );
app.set( 'views', __dirname + '/views' );
app.enable( 'view cache' );
app.engine( 'html', require( 'hogan-express' ));
app.use( require( 'express-autoprefixer' )( { browsers: 'last 2 versions', cascade: false } )).use( express.static( __dirname + '/assets' ));

var dataJSon = JSON.stringify( data );
var about = marked( fs.readFileSync( './about.md', { encoding: 'utf8' } ));

jspm.import( 'js/app' ).then( function( App ) {
  App = React.createFactory( App.default );

  function route( req, res ) {
    global.navigator = { userAgent: req.headers[ 'user-agent' ] };

    var selected = req.params.pattern;

    res.locals.json = dataJSon;
    res.locals.about = about;
    res.locals.videoId = getYouTubeID( data[ selected ] && data[ selected ].url );
    res.locals.domain = req.protocol + '://' + req.get( 'host' );
    res.locals.url = ( selected ) ? res.locals.domain + '/' + selected : res.locals.domain;
    res.locals.dev = ( settings.env === 'dev' );
    res.locals.DOM = ReactDOMServer.renderToString( App( {
      data: data,
      about: about,
      onCopyReady: function() {},
      selected: selected,
      format: req.params.format
    } ));

    res.render( 'index' );
  }

  app.get( '/refresh/content', function( req, res ) {
    data = hotload( './boris.json' );
    dataJSon = JSON.stringify( data );
    res.redirect( '/' );
  } );

  app.get( '/:pattern?', route );
  app.get( '/:pattern/:format?', route );
  app.listen( settings.port );
} );
