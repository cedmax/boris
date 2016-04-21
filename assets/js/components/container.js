import React from 'react';
import Paper from 'material-ui/lib/paper';

const style = {
  'padding': 20,
  'textAlign': 'center',
  'display': 'block',
  'margin': 'auto'
};

export default class Container extends React.Component {
  render() {
    return (
      <Paper
        style={ style }
        zDepth={1}
      >
        { this.props.children }
      </Paper>
    );
  }
}
