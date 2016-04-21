import React from 'react';
import Container from 'js/components/container';
import AutoComplete from 'js/components/autocomplete';
import MediaCard from 'js/components/mediacard';
import props from 'js/props';

export default class Category extends React.Component {
  render() {
    const {
      section,
      selected,
      data
    } = this.props;
    const videos = data.categories[ section ].videos;
    const currentVideo = selected ? videos[ selected ] : null;

    return (
      <div style={ {
        'background': `url(/img/${section}.jpg) no-repeat 50% calc(50% + 70px) / cover`,
        'position': 'absolute',
        'height': '100%',
        'width': '100%'
      }}>
        <Container>
          <AutoComplete
            { ...this.props }
            value={ currentVideo && currentVideo.title }
            options={ videos }
          />
        </Container>
        <MediaCard
          { ...this.props }
          currentVideo={ currentVideo }
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
  selected: React.PropTypes.string
};
