import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/title';
import Container from 'js/components/container';
import AutoComplete from 'js/components/autocomplete';
import MediaCard from 'js/components/mediacard';

export default class App extends React.Component {

  showVideo( selected ) {
    var keys = Object.keys( this.props.data );
    var sel = keys.filter(function(key){
      return this.props.data[key].title === selected
    }.bind(this))
    if ( sel.length ) {
      this.props.navigateTo('/'+sel[0]);
    }
  }

  render() {
    let selectedTitle, selectedUrl, gifUrl, forceGif;
    if (this.props.selected){
      selectedTitle = this.props.data[this.props.selected].title;
      selectedUrl = this.props.data[this.props.selected].url;
      gifUrl = this.props.data[this.props.selected].gif;
      forceGif = (this.props.format==='gif')
    }
    return (
      <div>
        <Title title="Boris" />
        <Container>
          <AutoComplete
            id="BorisText"
            value={selectedTitle}
            data={Object.keys( this.props.data ).map(function(key){
              return this.props.data[key].title;
            }.bind(this))}
          onSelect={this.showVideo.bind( this )} />
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
};
