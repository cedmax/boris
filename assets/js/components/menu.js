import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';


export default class NavMenu extends React.Component {
  constructor( props ) {
    super( props );

    this.onClick = this.onClick.bind( this );
  }

  onClick( disabled, key, sel ) {
    return () => disabled ?
      null :
      this.props.onClick( key, sel );
  }

  render() {
    let homeDisabled = ! this.props.selected;
    let repliesDisabled = this.props.selected === 'r';

    let {
      categories
    } = this.props.menu;

    let categoriesMenu = categories.map(( menuItem ) => {
      let disabled = ( menuItem.key === this.props.selected );
      return (
        <MenuItem
          disabled={ disabled }
          key={ menuItem.key }
          onClick={ this.onClick( disabled, menuItem.key ) }
        >
          { menuItem.value }
        </MenuItem> );
    } );

    return (
      <List>
        <MenuItem
          disabled={ homeDisabled }
          onClick={ this.onClick( homeDisabled, '' ) }
        >
          Home
        </MenuItem>
        <MenuItem
          disabled={ repliesDisabled }
          onClick={ this.onClick( repliesDisabled, 'r' ) }
        >
          Risposte Veloci
        </MenuItem>
        <ListItem
          primaryText="Sezioni"
          initiallyOpen={ true }
          primaryTogglesNestedList={ true }
          nestedItems={ categoriesMenu }
        />
      </List>
    );
  }
}
