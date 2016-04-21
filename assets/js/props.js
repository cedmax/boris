import React from 'react';

var video = React.PropTypes.shape( {
  title: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  quick: React.PropTypes.bool,
  gif: React.PropTypes.string,
  category: React.PropTypes.string
} );

export default {
  video,
  section: React.PropTypes.shape( {
    title: React.PropTypes.string.isRequired,
    videos: React.PropTypes.objectOf( video ).isRequired
  } ).isRequired
};
