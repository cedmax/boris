import React from 'react';
import Container from 'js/components/container';
import AutoComplete from 'js/components/autocomplete';
import MediaCard from 'js/components/mediacard';
import props from 'js/props';

export default class QuickReplies extends React.Component {
  render() {
    const replies = this.props.data.r;
    const videos = replies.videos;

    const selected = this.props.selected;

    if ( selected ) {
      var {
        title: videoTitle,
        url: videoUrl,
        gif: gifUrl,
        category: videoCategory
      } = videos[ selected ];
    }

    return (
      <div style={  {
        'background': `url(/img/${videoCategory || 'r'}.jpg) no-repeat 50% calc(50% + 70px) / cover`,
        'position': 'absolute',
        'height': '100%',
        'width': '100%'
      }}>
        <Container>
          <AutoComplete
            value={ videoTitle }
            section={ videoCategory }
            data={  Object.keys( videos ).map( key => videos[ key ].title )  }
            dropDownHeight={ this.props.dropDownHeight }
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

QuickReplies.propTypes = {
  data: React.PropTypes.shape( {
    r: props.section.isRequired
  } ).isRequired,
  onVideoSelect: React.PropTypes.func.isRequired,
  onCopyReady: React.PropTypes.func.isRequired,
  selected: React.PropTypes.string,
  format: React.PropTypes.string,
  dropDownHeight: React.PropTypes.number
};
