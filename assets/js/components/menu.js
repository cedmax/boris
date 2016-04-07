import React from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class Menu extends React.Component {
  constructor( props ) {
    super( props );

    this.onClick = this.onClick.bind( this );
  }

  onClick( disabled, key ) {
    return ()=> disabled ?
      null :
      this.props.onClick( key );
  }

  render() {
    let homeDisabled = ! this.props.selected;

    return (
      <div>
        <MenuItem disabled={homeDisabled} onClick={this.onClick( homeDisabled, '' )}>
          Home
        </MenuItem>
        {this.props.menu.map(( menuItem ) => {
          let disabled = ( menuItem.key === this.props.selected );
          return (
            <MenuItem
              disabled={disabled}
              key={menuItem.key}
              onClick={this.onClick( disabled, menuItem.key )}>
            {menuItem.value}
          </MenuItem> );
        } )}
      </div>
    );
  }
}
