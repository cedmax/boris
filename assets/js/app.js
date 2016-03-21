import React from 'react';
import ReactDOM from 'react-dom';
import Title from './components/title';
import Container from 'js/components/container';
import AutoComplete from 'js/components/autocomplete';
import VideoCard from 'js/components/videocard';

export default class App extends React.Component {
  showVideo( selected ) {
    if ( this.props.data[ selected ] ) {
      this.setState( { selected : this.props.data[ selected ] } );
    }
  }

  render() {
    let selected = this.state && this.state.selected;
    return (
      <div>
        <Title title="Boris" />
        <Container>
          <AutoComplete
            data={Object.keys( this.props.data )}
          onSelect={this.showVideo.bind( this )} />
        </Container>
        <VideoCard videoUrl={selected} onCopyReady={this.props.onCopyReady} />
      </div>
    );
  }
};
