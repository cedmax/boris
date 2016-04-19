var express = require( 'express' );
var requiredir = require( 'requiredir' );
var data = {};
data.categories = requiredir( './data' );
delete data.categories.length; delete data.categories.toArray;

var _ = require( 'lodash' );

function findQuickResponses( data ) {
  return _.reduce(
    _.map(
      _.keys( data ),
      ( itemKey ) => _.mapValues(
        _.pickBy( data[ itemKey ].videos, 'quick' ),
        video => _.assign( video, {
          category: itemKey
        } )
      )
    ),
    _.assign
  );
}

data.quickReplies = {
  title: 'Risposte Veloci',
  videos: findQuickResponses( data.categories )
};

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

app.enable( 'trust proxy' );
app.set( 'view engine', 'html' );
app.set( 'views', __dirname + '/views' );
app.enable( 'view cache' );
app.engine( 'html', require( 'hogan-express' ));
app.use( require( 'express-autoprefixer' )( { browsers: 'last 2 versions', cascade: false } )).use( express.static( __dirname + '/assets' ));

var dataJSon = JSON.stringify( data );
var about = marked( fs.readFileSync( './about.md', { encoding: 'utf8' } ));

jspm.import( 'js/app' ).then( function( App ) {
  App = React.createFactory( App.default );

  function render( req, res, categoryData, category, selected ) {
    var currentSection = categoryData.title;
    var currentData = categoryData.videos;

    if ( selected && ! currentData[ selected ] ) {
      res.redirect( `/${category}` );
    } else {
      var domain = req.protocol + '://' + req.get( 'host' );

      Object.assign( res.locals, {
        json: dataJSon,
        title: currentSection,
        about: about,
        category: category,
        videoId: getYouTubeID( currentData[ selected ] && currentData[ selected ].url ),
        domain: domain,
        url: `${domain}/${category}` + ( selected ? `/${selected}` : '' ),
        dev: ( settings.env === 'dev' ),
        DOM: ReactDOMServer.renderToString( App( {
          replies: data.quickReplies,
          data: data.categories,
          about: about,
          category: category,
          onCopyReady: function() {},
          selected: selected,
          format: req.params.format
        } ))
      } );

      res.render( 'index' );
    }
  }

  function route( req, res ) {
    global.navigator = { userAgent: req.headers[ 'user-agent' ] };

    var selected = req.params.pattern;
    var category = req.params.category;

    if ( data.categories[ category ] ) {
      render( req, res, data.categories[ category ], category, selected );
    } else if ( category === 'r' ) {
      render( req, res, data.quickReplies, category, selected );
    } else {
      res.redirect( '/' );
    }
  }

  app.get( '/refresh/:key', function( req, res ) {
    var key = req.params.key;
    if ( key ) {
      data.categories[ key ] = hotload( `./data/${key}.json` );
      dataJSon = JSON.stringify( data );
      res.redirect( `/${key}` );
    } else {
      res.redirect( '/' );
    }
  } );

  app.get( '/', function( req, res ) {
    global.navigator = { userAgent: req.headers[ 'user-agent' ] };
    var domain = req.protocol + '://' + req.get( 'host' );

    Object.assign( res.locals, {
      json: dataJSon,
      title: 'Trash Meme',
      about: about,
      domain: domain,
      url: domain + '/',
      dev: ( settings.env === 'dev' ),
      DOM: ReactDOMServer.renderToString( App( {
        data: data.categories,
        about: about
      } ))
    } );

    res.render( 'index' );
  } );

  app.get( '/:category/:pattern?/:format?', route );
  app.listen( settings.port );
} );
