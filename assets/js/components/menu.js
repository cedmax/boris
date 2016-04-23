import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import MenuItem from 'material-ui/lib/menus/menu-item';
import props from 'js/props';

export default class NavMenu extends React.Component {
  constructor( props ) {
    super( props );

    const {
      categories
    } = props.data;

    this.menuCategories = Object.keys( categories ).map(( key ) => ({
      key,
      value: categories[ key ].title
    }));
    this.onClick = this.onClick.bind( this );
  }

  onClick( disabled, key, sel ) {
    return () => disabled ?
      null :
      this.props.onClick( key, sel );
  }

  render() {
    const {
      section,
      data
    } = this.props;
    let homeDisabled = !section;
    let repliesDisabled = !!data[ section ];

    let menuCategories = this.menuCategories.map(( menuItem ) => {
      let disabled = ( menuItem.key === section );
      return (
        <MenuItem
          disabled={ disabled }
          key={ menuItem.key }
          onClick={ this.onClick( disabled, menuItem.key ) }
        >
          { menuItem.value }
        </MenuItem> );
    });

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
          nestedItems={ menuCategories }
        />
      </List>
    );
  }
}

NavMenu.propTypes = {
  data: React.PropTypes.shape({
    categories: React.PropTypes.objectOf( props.section ).isRequired,
    r: props.section
  }),
  onClick: React.PropTypes.func.isRequired,
  section: React.PropTypes.string
};
