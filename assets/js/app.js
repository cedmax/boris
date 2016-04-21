import React from 'react';
import Nav from 'js/components/nav';
import HomePage from 'js/pages/home';
import Category from 'js/pages/category';
import QuickReplies from 'js/pages/quick-replies';
import props from 'js/props';

export default class App extends React.Component {
  constructor( props ) {
    super( props );

    this.menu = {};
    const categories = props.data.categories;
    this.menu.categories = Object.keys( categories ).map(( key ) => ( {
      key: key,
      value: categories[ key ].title
    } ));
    this.showVideo = this.showVideo.bind( this );
  }

  showVideo( selected ) {
    var keys = Object.keys( this.videos );
    var sel = keys.filter( ( key ) => this.videos[ key ].title === selected );
    if ( sel.length ) {
      this.props.navigateTo( this.props.section, sel[ 0 ] );
    }
  }

  render() {
    let {
      section,
      data
    } = this.props;
    let sectionTitle, content;

    if ( data[ section ] ) {
      this.videos = data[ section ].videos;
      sectionTitle = data[ section ].title;
      content = (
        <QuickReplies
          { ...this.props }
          onVideoSelect={ this.showVideo }
        />
      );
    } else if ( section ) {
      this.videos = data.categories[ section ].videos;
      sectionTitle = data.categories[ section ].title;
      content = (
        <Category
          { ...this.props }
          onVideoSelect={ this.showVideo }
        />
      );
    } else {
      content = (
        <HomePage
          data={ this.props.data }
          onClick={ this.props.navigateTo }
        />
      );
    }

    return (
      <div>
        <Nav
          title={ sectionTitle || 'Trash Meme' }
          menu={ this.menu }
          current={ section || '' }
          onMenuClick={ this.props.navigateTo }
          staticContent={ this.props.data.about }
        />
        { content }
      </div>
    );
  }
}

App.propTypes = {
  data: React.PropTypes.shape( {
    categories: React.PropTypes.objectOf( props.section ).isRequired,
    r: props.section,
    about: React.PropTypes.string.isRequired
  } ).isRequired,
  navigateTo: React.PropTypes.func.isRequired,
  section: React.PropTypes.string
};
