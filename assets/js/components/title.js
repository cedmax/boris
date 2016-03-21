import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

export default class Title extends React.Component {
  render() {
    return (
      <AppBar
        showMenuIconButton={false}
        title={this.props.title} />
    );
  }
};
