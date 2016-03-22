import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CopyButton from 'js/components/copy-button';

export default class VideoCard extends React.Component {
  render() {
    let videoElm, videoId;

    const matches = this.props.videoUrl && this.props.videoUrl.match( /youtu.be\/([^\?]+)|v=([^\&\s]+)/ );
    videoId = matches && matches.length && ( matches[ 1 ] || matches[ 2 ] );

    if ( videoId ) {
      let styles = {
        position: "absolute",
        top: 'calc(50% + 70px)',
        left: '50%',
        transform: "translate3D(-50%,-50%,0)",
        width: '80vmin'
      }

      let button = (
        <CopyButton
          toBeCopied={this.props.videoUrl}
          onCopyReady={this.props.onCopyReady} />
      );

      let iframe = (
        <iframe
          src={'http://www.youtube.com/embed/' + videoId + '?autoplay=1&showinfo=0&rel=0'}
          allowFullScreen="allowFullScreen"
        ></iframe>
      );

      let subtitle = (
        <div>
          {button}
          <a href={this.props.videoUrl}>
            <pre>{this.props.videoUrl}</pre>
          </a>
        </div>
      );

      videoElm = (
        <Card style={styles}>
          <CardMedia className="videoWrapper">
            {iframe}
          </CardMedia>
          <CardTitle subtitle={subtitle} />
        </Card>
      );
    }

    return (
      <div>
        {videoElm}
      </div>
    );
  }
};
