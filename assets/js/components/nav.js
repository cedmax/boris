import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import HelpOutlineIcon from 'material-ui/lib/svg-icons/action/help-outline';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import ControlPointIcon from 'material-ui/lib/svg-icons/image/control-point';
import LeftNav from 'material-ui/lib/left-nav';
import Dialog from 'material-ui/lib/dialog';
import Menu from 'js/components/menu';
import SubmitDialog from 'js/components/submit-dialog';

export default class Nav extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      openDialog: false,
      openMenu: false,
      openSubmitDialog: false
    };
    this.handleToggleDialog = this.handleToggleDialog.bind( this );
    this.handleToggleSubmitDialog = this.handleToggleSubmitDialog.bind( this );
    this.handleToggleMenu = this.handleToggleMenu.bind( this );
  }

  handleToggleDialog () {
    this.setState( { openDialog: ! this.state.openDialog } );
  }

  handleToggleSubmitDialog () {
    this.setState( { openSubmitDialog: ! this.state.openSubmitDialog } );
  }

  handleToggleMenu () {
    this.setState( { openMenu: ! this.state.openMenu } );
  }

  render() {
    var dialogIcons = (
      <div>
        <IconButton onClick={this.handleToggleSubmitDialog}>
          <ControlPointIcon color="#fff" />
        </IconButton>
        <IconButton onClick={this.handleToggleDialog}>
          <HelpOutlineIcon color="#fff" />
        </IconButton>
      </div>
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

    let submitDialog;
    if ( this.state.openSubmitDialog ) {
      submitDialog = ( <SubmitDialog /> );
    }

    return (
      <div>
        <AppBar
          iconElementLeft={menuIcon}
          iconElementRight={dialogIcons}
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
          <Dialog
            modal={false}
            open={this.state.openSubmitDialog}
            onRequestClose={this.handleToggleSubmitDialog}>
           {submitDialog}
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
