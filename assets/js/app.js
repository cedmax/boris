import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/title';
import Container from 'js/components/container';
import AutoComplete from 'js/components/autocomplete';
import VideoCard from 'js/components/videocard';

export default class App extends React.Component {
  showVideo( selected ) {
    var keys = Object.keys( this.props.data );
    var sel = keys.filter(function(key){
      return this.props.data[key].title === selected
    }.bind(this))
    if ( sel.length ) {
      this.props.navigateTo(sel[0]);
    }
  }

  render() {
    let selectedTitle, selectedUrl;
    if (this.props.selected){
      selectedTitle = this.props.data[this.props.selected].title;
      selectedUrl = this.props.data[this.props.selected].url;
    }
    return (
      <div>
        <Title title="Boris" />
        <Container>
          <AutoComplete
            value={selectedTitle}
            data={Object.keys( this.props.data ).map(function(key){
              return this.props.data[key].title;
            }.bind(this))}
          onSelect={this.showVideo.bind( this )} />
        </Container>
        <VideoCard videoUrl={selectedUrl} onCopyReady={this.props.onCopyReady} />
      </div>
    );
  }
};
