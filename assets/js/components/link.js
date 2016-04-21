import React from 'react';

export default class Link extends React.Component {
  render() {
    const url = this.props.url;
    const style = {
      'fontFamily': 'monospace',
      'display': 'inline-block',
      'width': '80%',
      'whiteSpace': 'nowrap',
      'overflow': 'hidden',
      'textOverflow': 'ellipsis',
      'verticalAlign': 'middle'
    };

    return (
      <a
        style={ style }
        href={ url }
        target="_blank"
      >
        {url}
      </a>
    );
  }
}
