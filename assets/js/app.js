import React from 'react';
import Container from 'js/components/container';
import AutoComplete from 'js/components/autocomplete';
import MediaCard from 'js/components/mediacard';
import Nav from 'js/components/nav';

export default class App extends React.Component {
  constructor( props ) {
    super( props );
    let category = props.category;
    this.sectionTitle = props.data[category].title;
    this.data = props.data[category].videos;
    this.showVideo = this.showVideo.bind( this );
  }

  showVideo( selected ) {
    var keys = Object.keys( this.data );
    var sel = keys.filter( ( key ) => this.data[ key ].title === selected );
    if ( sel.length ) {
      this.props.navigateTo( '/' + this.props.category + '/' + sel[ 0 ] );
    }
  }

  render() {
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
      <div>
        <Nav title={this.sectionTitle}
          staticContent={this.props.staticContent} />
        <Container>
          <AutoComplete
            id="BorisText"
            value={videoTitle}
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
