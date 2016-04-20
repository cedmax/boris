var fs = require( 'fs' );
var _ = require( 'lodash' );
var marked = require( 'marked' );
var requiredir = require( 'requiredir' );
var extractQuickResponses = require('./extract-quick-replies');


module.exports = function(categoriesPath, pages){
  var categories = requiredir( `../${categoriesPath}` );
  var quick = extractQuickResponses( categories );
  delete categories.length;
  delete categories.toArray;
  delete categories.hidden;
  
  pages = _.mapValues(pages, page => marked(fs.readFileSync( `${page}` , { encoding: 'utf8' })));
  return _.assign({
    categories,
    r: {
      title: 'Risposte Veloci',
      videos: quick
    }
  }, pages);
};
