import React from 'react';
import style from 'js/style';

export default class Link extends React.Component {
  render() {
    const {
      url
    } = this.props;

    return (
      <a
        style={ style.link.main }
        href={ url }
        target="_blank"
      >
        {url}
      </a>
    );
  }
}

Link.propTypes = {
  url: React.PropTypes.string.isRequired
};
