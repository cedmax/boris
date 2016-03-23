import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Video from 'material-ui/lib/svg-icons/av/videocam';

export default class VideoButton extends React.Component {
  render() {
    return (
      <IconButton
        onClick={this.props.onClick}
        style={{
          verticalAlign: "middle",
          display: "inline-block",
        }}
        tooltip="Show a gif instead"
        >
        <Video />
      </IconButton>
    );
  }
};
