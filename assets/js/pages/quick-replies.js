import React from 'react';
import Container from 'js/components/container';
import AutoComplete from 'js/components/autocomplete';
import MediaCard from 'js/components/mediacard';
import style from 'js/style';
import props from 'js/props';

export default class QuickReplies extends React.Component {
  render() {
    const {
      data,
      selected
    } = this.props;
    const {
      videos
    } = data.r;
    const currentVideo = selected ? videos[ selected ] : null;
    return (
      <div
        style={ Object.assign({}, style.pages.quickReplies.container, {
          'background': `url(/img/${currentVideo && currentVideo.category || 'r'}.jpg) no-repeat 50% calc(50% + 70px) / cover`
        }) }
      >
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

QuickReplies.propTypes = {
  data: React.PropTypes.shape({
    r: props.section.isRequired
  }).isRequired,
  selected: React.PropTypes.string
};
