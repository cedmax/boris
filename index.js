var express = require( 'express' );
var data = require( './boris.json' );
var settings = require( './settings.json' );
var fs = require( 'fs' );
var marked = require( 'marked' );
var hotload = require('hotload');
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
var about = marked( fs.readFileSync( './about.md', { encoding: 'utf8' } ));

jspm.import( 'js/app' ).then( function( App ) {
  App = React.createFactory( App.default );

  function route( req, res ) {
    var selected = req.params.pattern;
    var videoIdMatches = selected && data[selected].url.match(/youtu.be\/([^\?]+)|v=([^\&\s]+)/);
    var videoId = videoIdMatches && videoIdMatches.length && (videoIdMatches[1] || videoIdMatches[2]);

    global.navigator = { userAgent: req.headers[ 'user-agent' ] };
    res.locals.json = dataJSon;
    res.locals.about = about;
    res.locals.videoId = videoId;
    res.locals.dev = ( settings.env === 'dev' );

    var html = ReactDOMServer.renderToString( App( {
      data: data,
      about: about,
      onCopyReady: function() {},
      selected: req.params.pattern,
      format: req.params.format
    } ));

    res.locals.DOM = html;

    res.render( 'index' );
  }

  app.get( '/refresh/content', function( req, res ){
    data = hotload( './boris.json' );
    dataJSon = JSON.stringify( data );
    res.redirect('/');
  } );

  app.get( '/:pattern?', route );
  app.get( '/:pattern/:format?', route );
  app.listen( settings.port );
} );
