import React from 'react';

export default class VideoCard extends React.Component {
  render() {
    const matches = this.props.videoUrl && this.props.videoUrl.match( /youtu.be\/([^\?]+)|v=([^\&\s]+)/ );
    const videoId = matches && matches.length && ( matches[ 1 ] || matches[ 2 ] );

    if ( ! videoId ) {
      return ( <div/> );
    }

    return (
      <div
        style={ {
          'position': 'relative',
          'paddingBottom': '56.25%',
          'paddingTop': '25px',
          'height': '0'
        } }
      >
        <iframe
          style={ {
            'border': '0',
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%'
          } }
          src={ `https://www.youtube.com/embed/${videoId}?autoplay=1&showinfo=0&rel=0` }
          allowFullScreen="allowFullScreen"
        ></iframe>
      </div>
    );
  }
}
