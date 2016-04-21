import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import HelpOutlineIcon from 'material-ui/lib/svg-icons/action/help-outline';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import ControlPointIcon from 'material-ui/lib/svg-icons/image/control-point';
import LeftNav from 'material-ui/lib/left-nav';
import Dialog from 'material-ui/lib/dialog';
import Menu from 'js/components/menu';
import SubmitDialog from 'js/components/submit-dialog';
import FlatButton from 'material-ui/lib/flat-button';

export default class Nav extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      openDialog: false,
      openMenu: false,
      openSubmitDialog: false
    };
    this.handleOpenDialog = this.handleOpenDialog.bind( this );
    this.handleOpenSubmitDialog = this.handleOpenSubmitDialog.bind( this );
    this.handleCloseDialog = this.handleCloseDialog.bind( this );
    this.handleCloseSubmitDialog = this.handleCloseSubmitDialog.bind( this );
    this.handleToggleMenu = this.handleToggleMenu.bind( this );
  }

  handleOpenDialog () {
    this.setState( { openDialog: true } );
  }

  handleOpenSubmitDialog () {
    this.setState( { openSubmitDialog: true } );
  }

  handleCloseDialog () {
    this.setState( { openDialog: false } );
  }

  handleCloseSubmitDialog () {
    this.setState( { openSubmitDialog: false } );
  }

  handleToggleMenu () {
    this.setState( { openMenu: ! this.state.openMenu } );
  }

  render() {
    var menuStyle = {
      button: {
        'padding': '5px 0',
        'minWidth': 'auto'
      },
      icon: '#fff',
      label: {
        'color': '#fff',
        'display': 'block',
        'fontSize': '70%',
        'lineHeight': 1.5
      }
    };

    var dialogIcons = (
      <div>
        <FlatButton
          style={ menuStyle.button }
          onClick={ this.handleOpenSubmitDialog }
          label="Add"
          labelStyle={ menuStyle.label} >
          <ControlPointIcon
            color={ menuStyle.icon}
          />
        </FlatButton>
        <FlatButton
          style={ menuStyle.button }
          onClick={ this.handleOpenDialog }
          label="About"
          labelStyle={ menuStyle.label} >
          <HelpOutlineIcon
            color={ menuStyle.icon}
          />
        </FlatButton>
      </div>
    );

    var menuIcon = (
      <FlatButton
        style={ menuStyle.button }
        labelStyle={ menuStyle.label }
        label="Menu"
        onClick={ this.handleToggleMenu}
      >
        <MenuIcon
          color={ menuStyle.icon}
        />
      </FlatButton>
    );

    let menu;
    if ( this.state.openMenu ) {
      menu = (
        <Menu
          menu={ this.props.menu }
          selected={ this.props.current }
          onClick={ ( menuKey, selection )=> {
            this.setState( {
              openMenu: false
            } );
            this.props.onMenuClick( menuKey, selection );
          } }
        />
      );
    }

    let submitDialog;
    if ( this.state.openSubmitDialog ) {
      submitDialog = ( <SubmitDialog /> );
    }

    return (
      <div>
        <AppBar
          iconElementLeft={ menuIcon }
          iconElementRight={ dialogIcons }
          title={ this.props.title}
        />
        <Dialog
          title="About"
          modal={ false }
          autoScrollBodyContent={ true }
          open={ this.state.openDialog }
          onRequestClose={ this.handleCloseDialog }
        >
          <div
            dangerouslySetInnerHTML={ { __html: this.props.staticContent } }
          ></div>
        </Dialog>
        <Dialog
          modal={ false }
          open={ this.state.openSubmitDialog }
          onRequestClose={ this.handleCloseSubmitDialog} >
          { submitDialog }
        </Dialog>
        <LeftNav
          docked={ false }
          onRequestChange={ openMenu => this.setState( { openMenu } ) }
          open={ this.state.openMenu }
        >
          { menu }
        </LeftNav>
      </div>
    );
  }
}
