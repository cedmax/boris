import React from 'react';
import IconButton from 'material-ui/lib/icon-button';
import ContentContentCopy from 'material-ui/lib/svg-icons/content/content-copy';
import style from 'js/style';

export default class CopyButton extends React.Component {
  render() {
    return (
      <IconButton
        className='copy-btn'
        style={ style.buttons }
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

CopyButton.propTypes = {
  toBeCopied: React.PropTypes.string.isRequired,
  onCopyReady: React.PropTypes.func.isRequired
};
