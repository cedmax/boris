import React from 'react';
import Container from 'js/components/container';
import AutoComplete from 'js/components/autocomplete';
import MediaCard from 'js/components/mediacard';

export default class App extends React.Component {
  render() {
    const replies = this.props.data.r;
    const videos = replies.videos;

    let forceGif, selected = this.props.selected;

    if ( selected ) {
      var {
        title: videoTitle,
        url: videoUrl,
        gif: gifUrl,
        category: category
      } = videos[ selected ];

      forceGif = ( this.props.format === 'gif' );
    }

    return (
      <div style={{
        background: `url(/img/${category || 'r'}.jpg) no-repeat 50% calc(50% + 70px) / cover`,
        position: 'absolute',
        height: '100%',
        width: '100%'
      }}>
        <Container>
          <AutoComplete
            dropDownHeight={this.props.dropDownHeight}
            value={videoTitle}
            category={category}
            data={ Object.keys( videos ).map( key => videos[ key ].title ) }
            onSelect={this.props.onVideoSelect} />
        </Container>
        <MediaCard
          title={videoTitle}
          gifUrl={gifUrl}
          videoUrl={videoUrl}
          onCopyReady={this.props.onCopyReady}
          forceGif={forceGif}
        />
      </div>
    );
  }
}
