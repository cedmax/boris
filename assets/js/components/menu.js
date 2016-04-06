import React from 'react';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class Menu extends React.Component {
  render() {
    return (
      <div>
        {this.props.menu.map(( menuItem ) => {
          let disabled = ( menuItem.key === this.props.selected );
          return (
            <MenuItem
              disabled={disabled}
              key={menuItem.key}
              onClick={()=> disabled ?
                null :
                this.props.onClick( menuItem.key )}>
            {menuItem.value}
          </MenuItem> );
        } )}
      </div>
    );
  }
}
