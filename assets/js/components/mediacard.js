import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CopyButton from 'js/components/buttons/copy';
import GifButton from 'js/components/buttons/gif';
import VideoButton from 'js/components/buttons/video';
import Link from 'js/components/link';
import Video from 'js/components/video';

export default class MediaCard extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      gif: props.forceGif
    }
    this.toggleGif = this.toggleGif.bind( this );
  }

  toggleGif() {
    this.setState( {
      gif: ! this.state.gif
    } );
  }

  shouldComponentUpdate( nextProps, nextState ) {
    if ( nextProps.title !== this.props.title ) {
      nextState.gif = nextProps.forceGif;
    }
    return true;
  }

  render() {
    if ( ! this.props.videoUrl ) {
      return ( <div /> );
    }

    let styles = {
      position: "absolute",
      top: 'calc(50% + 70px)',
      left: '50%',
      transform: "translate3D(-50%,-50%,0)",
      width: '80vmin'
    }

    let alternateButton;
    let url = this.props.videoUrl;
    let media = ( <Video videoUrl={url} /> );

    const isGifEnabled = this.props.gifUrl;
    const isGifVisible = this.state.gif;

    if ( isGifEnabled && ! isGifVisible ) {
      alternateButton = (
        <GifButton
          onClick={this.toggleGif} />
      );
    } else if ( isGifVisible ) {
      url = this.props.gifUrl;
      alternateButton = (
        <VideoButton
          onClick={this.toggleGif} />
      );
      media = (
        <img title={this.props.title} src={url} />
      )
    }

    let subtitle = (
      <div style={{
        'display': 'flex',
        'alignItems': 'center'
      }}>
        {alternateButton}

        <CopyButton
          toBeCopied={url}
          onCopyReady={this.props.onCopyReady} />
        <Link url={url} />
      </div>
    );

    return (
      <Card style={styles}>
        <CardMedia>
          {media}
        </CardMedia>
        <CardTitle subtitle={subtitle} />
      </Card>
    );
  }
};
