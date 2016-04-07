import React from 'react';
import Nav from 'js/components/nav';
import HomePage from 'js/pages/home';
import Category from 'js/pages/category';

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

    if ( data[ category ] || ! category ) {
      this.props.navigateTo( category );
    }
  }

  showVideo( selected ) {
    var keys = Object.keys( this.videos );
    var sel = keys.filter( ( key ) => this.videos[ key ].title === selected );
    if ( sel.length ) {
      this.props.navigateTo( this.props.category, sel[ 0 ] );
    }
  }

  render() {
    let category = this.props.category;
    this.videos = this.props.data[ category ] &&
        this.props.data[ category ].videos;

    let content, sectionTitle;
    if ( category ) {
      sectionTitle = this.props.data[ category ].title;
      content = (
        <Category {...this.props} onVideoSelect={this.showVideo} />
      );
    } else {
      content = (
        <HomePage data={this.props.data} onClick={this.navigateCategory} />
      );
    }

    return (
      <div>
        <Nav
          title={sectionTitle || 'Trash Meme'}
          menu={this.menu}
          current={category || ''}
          onMenuClick={this.navigateCategory}
          staticContent={this.props.staticContent} />
        {content}
      </div>
    );
  }
}
