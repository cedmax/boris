import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';


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
    let {
      categories,
      replies
    } = this.props.menu;

    let categoriesMenu = categories.map(( menuItem ) => {
      let disabled = ( menuItem.key === this.props.selected );
      return (
        <ListItem
          primaryText={menuItem.value}
          disabled={disabled}
          key={menuItem.key}
          onClick={this.onClick( disabled, menuItem.key )} /> );
    } );

    let RepliesMenu = Object.keys( replies ).map(( itemKey ) => {
      var menuItem = replies[ itemKey ];
      return (
        <ListItem
          primaryText={menuItem.title}
          key={itemKey}
          onClick={this.onClick( false, menuItem.category, itemKey )} /> );
    } );

    return (
      <List>
        <ListItem
          primaryText="Home"
          disabled={homeDisabled}
          onClick={this.onClick( homeDisabled, '' )}/>
        <ListItem
          primaryText="Risposte Veloci"
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={RepliesMenu}
        />
        <ListItem
          primaryText="Sezioni"
          initiallyOpen={true}
          primaryTogglesNestedList={true}
          nestedItems={categoriesMenu}
          />
      </List>
    );
  }
}
