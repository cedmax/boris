import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import HelpOutline from 'material-ui/lib/svg-icons/action/help-outline';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import LeftNav from 'material-ui/lib/left-nav';
import Dialog from 'material-ui/lib/dialog';
import Menu from 'js/components/menu';

export default class Nav extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      openDialog: false,
      openMenu: false
    };
    this.handleToggleDialog = this.handleToggleDialog.bind( this );
    this.handleToggleMenu = this.handleToggleMenu.bind( this );
  }

  handleToggleDialog () {
    this.setState( { openDialog: ! this.state.openDialog } );
  }

  handleToggleMenu () {
    this.setState( { openMenu: ! this.state.openMenu } );
  }

  render() {
    var dialogIcon = (
      <IconButton onClick={this.handleToggleDialog}>
        <HelpOutline />
      </IconButton>
    );

    var menuIcon = (
      <IconButton onClick={this.handleToggleMenu}>
        <MenuIcon />
      </IconButton>
    );

    let menu;
    if ( this.state.openMenu ) {
      menu = (
        <Menu
          menu={this.props.menu}
          selected={this.props.current}
          onClick={( menuKey )=> {
            this.setState( {
              openMenu: false
            } );
            this.props.onMenuClick( menuKey );
          }} />
      );
    }

    return (
      <div>
        <AppBar
          iconElementLeft={menuIcon}
          iconElementRight={dialogIcon}
          title={this.props.title} />
          <Dialog
             title="About"
             modal={false}
             autoScrollBodyContent={true}
             open={this.state.openDialog}
             onRequestClose={this.handleToggleDialog}
             >
             <div dangerouslySetInnerHTML={{ __html: this.props.staticContent }}></div>
           </Dialog>
        <LeftNav
          docked={false}
          onRequestChange={openMenu => this.setState( { openMenu } )}
          open={this.state.openMenu}>
          {menu}
        </LeftNav>
      </div>
    );
  }
}
