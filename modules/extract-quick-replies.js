var _ = require( 'lodash' );

module.exports = function( data ) {
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
};
