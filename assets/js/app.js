import React from 'react';
import Container from 'js/components/container';
import AutoComplete from 'js/components/autocomplete';
import MediaCard from 'js/components/mediacard';
import Nav from 'js/components/nav';

export default class App extends React.Component {
  constructor( props ) {
    super( props );
    this.data = props.data;
    this.showVideo = this.showVideo.bind( this );
  }

  showVideo( selected ) {
    var keys = Object.keys( this.data );
    var sel = keys.filter( ( key ) => this.data[ key ].title === selected );
    if ( sel.length ) {
      this.props.navigateTo( '/' + sel[ 0 ] );
    }
  }

  render() {
    let forceGif, selected = this.props.selected;

    if ( selected ) {
      var {
        title: selectedTitle,
        url: selectedUrl,
        gif: gifUrl
      } = this.data[ selected ];

      forceGif = ( this.props.format === 'gif' );
    }

    return (
      <div>
        <Nav title="Boris"
          staticContent={this.props.staticContent} />
        <Container>
          <AutoComplete
            id="BorisText"
            value={selectedTitle}
            data={ Object.keys( this.data ).map( key => this.data[ key ].title ) }
            onSelect={this.showVideo} />
        </Container>
        <MediaCard
          title={selectedTitle}
          gifUrl={gifUrl}
          videoUrl={selectedUrl}
          onCopyReady={this.props.onCopyReady}
          forceGif={forceGif}
        />
      </div>
    );
  }
}
