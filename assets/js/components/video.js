import React from 'react';
import style from 'js/style';

export default class VideoCard extends React.Component {
  render() {
    const matches = this.props.videoUrl && this.props.videoUrl.match( /youtu.be\/([^\?]+)|v=([^\&\s]+)/ );
    const videoId = matches && matches.length && ( matches[ 1 ] || matches[ 2 ] );

    if ( !videoId ) {
      return ( <div/> );
    }

    return (
      <div
        style={ style.video.container }
      >
        <iframe
          style={ style.video.videoItem }
          src={ `https://www.youtube.com/embed/${videoId}?autoplay=1&showinfo=0&rel=0` }
          allowFullScreen="allowFullScreen"
        ></iframe>
      </div>
    );
  }
}

VideoCard.propTypes = {
  videoUrl: React.PropTypes.string.isRequired
};
