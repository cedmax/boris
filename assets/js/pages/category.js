import React from 'react';
import Container from 'js/components/container';
import AutoComplete from 'js/components/autocomplete';
import MediaCard from 'js/components/mediacard';

export default class App extends React.Component {
  render() {
    let category = this.props.category;
    this.sectionTitle = this.props.data[ category ].title;
    this.data = this.props.data[ category ].videos;

    let forceGif, selected = this.props.selected;

    if ( selected ) {
      var {
        title: videoTitle,
        url: videoUrl,
        gif: gifUrl
      } = this.data[ selected ];

      forceGif = ( this.props.format === 'gif' );
    }

    return (
      <div style={{
        background: `url(/img/${category}.jpg) no-repeat 50% calc(50% + 70px) / cover`,
        position: 'absolute',
        height: '100%',
        width: '100%'
      }}>
        <Container>
          <AutoComplete
            value={videoTitle}
            category={category}
            data={ Object.keys( this.data ).map( key => this.data[ key ].title ) }
            onSelect={this.showVideo} />
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
