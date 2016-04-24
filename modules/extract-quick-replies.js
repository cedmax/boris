var _ = require( 'lodash' );

module.exports = function( data ) {
  const hidden = data.hidden;
  return _.assign(
    _.reduce(
      _.map(
        _.keys( data ),
        ( itemKey ) => _.mapValues(
          _.pickBy( data[ itemKey ].videos, 'quick' ),
          video => _.assign( video, {
            category: (itemKey==='hidden') ? 'r': itemKey
          } )
        )
      ),
      _.assign
    ),
    hidden.videos
  );
};
