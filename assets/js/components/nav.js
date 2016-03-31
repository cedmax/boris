import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import HelpOutline from 'material-ui/lib/svg-icons/action/help-outline';

import Dialog from 'material-ui/lib/dialog';

export default class Nav extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      open: false
    };
    this.handleToggle = this.handleToggle.bind( this );
  }

  handleToggle () {
    this.setState( { open: ! this.state.open } );
  }

  render() {
    var icon = (
      <IconButton onClick={this.handleToggle}>
        <HelpOutline />
      </IconButton>
    );

    return (
      <div>
        <AppBar
          iconElementRight={icon}
          showMenuIconButton={false}
          title={this.props.title} />
          <Dialog
             title="About"
             modal={false}
             autoScrollBodyContent={true}
             open={this.state.open}
             onRequestClose={this.handleToggle}
             >
             <div dangerouslySetInnerHTML={{ __html: this.props.staticContent }} />
           </Dialog>
      </div>
    );
  }
}
