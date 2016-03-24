import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import Gif from 'material-ui/lib/svg-icons/action/gif';

export default class GifButton extends React.Component {
  render() {
    return (
      <IconButton
        onClick={this.props.onClick}
        style={{
          verticalAlign: 'middle',
          display: 'inline-block'
        }}
        tooltip='Show a gif instead'>
        <Gif />
      </IconButton>
    );
  }
}
