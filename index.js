var express = require( 'express' );
var requiredir = require( 'requiredir' );
var data = requiredir( './data' );
delete data.length;

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
    var category = req.params.category;

    if ( data[ category ] ) {
      var currentSection = data[ category ].title;
      var currentData = data[ category ].videos;

      if ( selected && ! currentData[ selected ] ) {
        res.redirect( `/${category}` );
      } else {
        res.locals.json = dataJSon;
        res.locals.title = currentSection;
        res.locals.about = about;
        res.locals.category = category;
        res.locals.videoId = getYouTubeID( currentData[ selected ] && currentData[ selected ].url );
        res.locals.domain = req.protocol + '://' + req.get( 'host' );
        res.locals.url = ( selected ) ? res.locals.domain + '/' + category + '/'  + selected : res.locals.domain + '/' + category;
        res.locals.dev = ( settings.env === 'dev' );
        res.locals.DOM = ReactDOMServer.renderToString( App( {
          data: data,
          about: about,
          category: category,
          onCopyReady: function() {},
          selected: selected,
          format: req.params.format
        } ));

        res.render( 'index' );
      }
    } else {
      res.redirect( '/' );
    }
  }

  app.get( '/refresh/:key', function( req, res ) {
    var key = req.params.key;
    if ( key ) {
      data[ key ] = hotload( `./data/${key}.json` );
      dataJSon = JSON.stringify( data );
      res.redirect( `/${key}` );
    } else {
      res.redirect( '/' );
    }
  } );

  app.get( '/', function( req, res ) {
    global.navigator = { userAgent: req.headers[ 'user-agent' ] };

    res.locals.json = dataJSon;
    res.locals.title = 'Trash Meme';
    res.locals.about = about;
    res.locals.domain = req.protocol + '://' + req.get( 'host' );
    res.locals.url = res.locals.domain + '/';
    res.locals.dev = ( settings.env === 'dev' );
    res.locals.DOM = ReactDOMServer.renderToString( App( {
      data: data,
      about: about
    } ));

    res.render( 'index' );
  } );

  app.get( '/:category/:pattern?/:format?', route );
  app.listen( settings.port );
} );
