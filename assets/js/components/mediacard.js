import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CopyButton from 'js/components/buttons/copy';
import GifIcon from 'material-ui/lib/svg-icons/action/gif';
import Button from 'js/components/buttons/generic';
import Link from 'js/components/link';
import Video from 'js/components/video';
import VideoIcon from 'material-ui/lib/svg-icons/av/videocam';
import props from 'js/props';

function forceGif( props ) {
  return props.format === 'gif';
}

function getVideoTitle( props ) {
  return props.currentVideo && props.currentVideo.title;
}

export default class MediaCard extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      gif: forceGif( props )
    };
    this.toggleGif = this.toggleGif.bind( this );
  }

  toggleGif() {
    this.setState({
      gif: !this.state.gif
    });
  }

  shouldComponentUpdate( nextProps, nextState ) {
    if ( getVideoTitle( nextProps ) !== getVideoTitle( this.props )) {
      nextState.gif = forceGif( nextProps );
    }
    return true;
  }

  render() {
    const {
      currentVideo
    } = this.props;

    let {
      url,
      gif,
      title
    } = currentVideo || {};

    if ( !url ) {
      return ( <div /> );
    }

    let styles = {
      'position': 'absolute',
      'top': 'calc(25% + 200px)',
      'left': '50%',
      'transform': 'translate3D(-50%,-50%,0)',
      'width': '80vmin'
    };

    let alternateButton;
    let media = ( <Video videoUrl={url} /> );

    const isGifEnabled = gif;
    const isGifVisible = this.state.gif;

    if ( isGifEnabled && !isGifVisible ) {
      alternateButton = (
        <Button
          onClick={ this.toggleGif }
          tooltip='Show the GIF instead'
          icon={ <GifIcon /> }
        />
      );
    } else if ( isGifVisible ) {
      url = gif;
      alternateButton = (
        <Button
          onClick={this.toggleGif }
          tooltip='Show the video instead'
          icon={ <VideoIcon /> }
        />
      );
      media = (
        <img
          title={ title }
          src={ url }
        />
      );
    }

    let subtitle = (
      <div
        style={{
          'display': 'flex',
          'alignItems': 'center'
        }}
      >
        {alternateButton}

        <CopyButton
          toBeCopied={ url }
          onCopyReady={ this.props.onCopyReady }
        />
        <Link
          url={ url }
        />
      </div>
    );

    return (
      <Card
        style={ styles }
      >
        <CardMedia>
          { media }
        </CardMedia>
        <CardTitle
          subtitle={ subtitle }
        />
      </Card>
    );
  }
}

MediaCard.propTypes = {
  title: React.PropTypes.string,
  currentVideo: props.video,
  selected: React.PropTypes.string,
  onCopyReady: React.PropTypes.func.isRequired
};
