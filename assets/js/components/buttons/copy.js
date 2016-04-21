import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import ContentContentCopy from 'material-ui/lib/svg-icons/content/content-copy';

export default class CopyButton extends React.Component {
  render() {
    return (
      <IconButton
        className='copy-btn'
        style={ {
          'verticalAlign': 'middle',
          'display': 'inline-block'
        } }
        tooltip='Copy to clipboard'
        data-clipboard-text={ this.props.toBeCopied }
      >
        <ContentContentCopy />
      </IconButton>
    );
  }

  componentDidMount() {
    this.props.onCopyReady( '.copy-btn' );
  }
}
