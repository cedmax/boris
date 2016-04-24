import React from 'react';
import Paper from 'material-ui/lib/paper';
import style from 'js/style';


export default class Container extends React.Component {
  render() {
    return (
      <Paper
        style={ style.container.main }
        zDepth={1}
      >
        { this.props.children }
      </Paper>
    );
  }
}

Container.propTypes = {
  children: React.PropTypes.oneOfType( [
    React.PropTypes.arrayOf( React.PropTypes.element ),
    React.PropTypes.element,
    React.PropTypes.arrayOf( React.PropTypes.node ),
    React.PropTypes.node
  ] ).isRequired
};
