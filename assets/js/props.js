import React from 'react';

var videos = React.PropTypes.shape( {
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  quick: React.PropTypes.bool,
  gif: React.PropTypes.string,
  category: React.PropTypes.string
} );

export default {
  section: React.PropTypes.shape( {
    title: React.PropTypes.string.isRequired,
    videos: React.PropTypes.objectOf( videos ).isRequired
  } ).isRequired
};
