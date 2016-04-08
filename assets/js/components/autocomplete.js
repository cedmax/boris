import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';

export default class BorisAutoComplete extends React.Component {
  constructor ( props ) {
    super( props );

    this.state = {
      searchText: '',
      category: props.category
    };
  }

  handleUpdateInput( text ) {
    this.setState( {
      searchText: text
    } );
  }

  handleSelect( text ) {
    this.handleUpdateInput( text );
    this.props.onSelect( text );
  }

  handleChangeCategory( category ) {
    this.setState( {
      category,
      searchText: ''
    } );
  }

  shouldComponentUpdate( nextProp, nextState ) {
    if ( nextProp.category !== nextState.category ) {
      this.handleChangeCategory( nextProp.category );
      return false;
    }
    return true;
  }

  render() {
    var placeHolder = this.props.value ?
      this.props.value :
      `Prova con ${ this.props.data[ 0 ] }`;

    let menuProps;

    if (this.props.dropDownHeight) {
      menuProps = {
        maxHeight: this.props.dropDownHeight
      };
    }

    return (
      <div style={{
        minWidth: '250px',
        width: '40%',
        margin: 'auto'
      }}>
        <AutoComplete
          menuProps={menuProps}
          id={`search-${this.props.category}`}
          searchText={this.state.searchText}
          fullWidth={true}
          hintText={placeHolder}
          dataSource={this.props.data}
          filter={AutoComplete.caseInsensitiveFilter}
          openOnFocus={true}
          onUpdateInput={this.handleUpdateInput.bind( this )}
          onNewRequest={this.handleSelect.bind( this )} />
      </div>
    );
  }
}
