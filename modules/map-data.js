var fs = require( 'fs' );
var _ = require( 'lodash' );
var marked = require( 'marked' );
var extractQuickResponses = require('./extract-quick-replies');
var requiredir = require( 'requiredir' );

module.exports = function(categoriesPath, pages){
  var categories = requiredir( `../${categoriesPath}` );
  delete categories.length; delete categories.toArray;
  pages = _.mapValues(pages, page => marked(fs.readFileSync( `${page}` , { encoding: 'utf8' })));
  return _.assign({
    categories,
    r: {
      title: 'Risposte Veloci',
      videos: extractQuickResponses( categories )
    }
  }, pages);
};
