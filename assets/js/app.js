import React from 'react';
import Container from 'js/components/container';
import AutoComplete from 'js/components/autocomplete';
import MediaCard from 'js/components/mediacard';
import Nav from 'js/components/nav';

export default class App extends React.Component {
  constructor( props ) {
    super( props );

    this.menu = Object.keys( props.data ).map(( key ) => ( {
      key: key,
      value: props.data[ key ].title
    } ));

    this.showVideo = this.showVideo.bind( this );
    this.navigateCategory = this.navigateCategory.bind( this );
  }

  navigateCategory( category ) {
    var data = this.props.data;

    if ( data[ category ] ) {
      this.props.navigateTo( category );
    }
  }

  showVideo( selected ) {
    var keys = Object.keys( this.data );
    var sel = keys.filter( ( key ) => this.data[ key ].title === selected );
    if ( sel.length ) {
      this.props.navigateTo( this.props.category, sel[ 0 ] );
    }
  }

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
        <Nav
          title={this.sectionTitle}
          menu={this.menu}
          current={category}
          onMenuClick={this.navigateCategory}
          staticContent={this.props.staticContent} />
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
