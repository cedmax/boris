import React from 'react';
import IconButton from 'material-ui/lib/icon-button';

export default class Button extends React.Component {
  render() {
    return (
      <IconButton
        onClick={ this.props.onClick }
        style={ {
          'verticalAlign': 'middle',
          'display': 'inline-block'
        } }
        tooltip={ this.props.tooltip }
      >
        { this.props.icon }
      </IconButton>
    );
  }
}
