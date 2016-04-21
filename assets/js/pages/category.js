import React from 'react';
import Container from 'js/components/container';
import AutoComplete from 'js/components/autocomplete';
import MediaCard from 'js/components/mediacard';
import props from 'js/props';

export default class Category extends React.Component {
  render() {
    const section = this.props.section;
    const data = this.props.data.categories;
    this.sectionTitle = data[ section ].title;
    this.data = data[ section ].videos;

    const selected = this.props.selected;

    if ( selected ) {
      var {
        title: videoTitle,
        url: videoUrl,
        gif: gifUrl
      } = this.data[ selected ];
    }

    return (
      <div style={ {
        'background': `url(/img/${section}.jpg) no-repeat 50% calc(50% + 70px) / cover`,
        'position': 'absolute',
        'height': '100%',
        'width': '100%'
      }}>
        <Container>
          <AutoComplete
            dropDownHeight={ this.props.dropDownHeight }
            value={ videoTitle }
            section={ section }
            data={ Object.keys( this.data ).map( key => this.data[ key ].title ) }
            onSelect={ this.props.onVideoSelect }
          />
        </Container>
        <MediaCard
          title={ videoTitle }
          gifUrl={ gifUrl }
          videoUrl={ videoUrl }
          onCopyReady={ this.props.onCopyReady }
          format={ this.props.format }
        />
      </div>
    );
  }
}

Category.propTypes = {
  data: React.PropTypes.shape( {
    categories: React.PropTypes.objectOf( props.section ).isRequired
  } ).isRequired,
  section: React.PropTypes.string.isRequired,
  onVideoSelect: React.PropTypes.func.isRequired,
  onCopyReady: React.PropTypes.func.isRequired,
  selected: React.PropTypes.string,
  format: React.PropTypes.string,
  dropDownHeight: React.PropTypes.number
};
