import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';
import props from 'js/props';
import style from 'js/style';

export default class BorisAutoComplete extends React.Component {
  constructor ( props ) {
    super( props );
    this.state = {
      searchText: '',
      section: props.section
    };

    this.navigateToVideo = this.navigateToVideo.bind( this );
  }

  onFocus() {
    this.setState({
      searchText: ''
    });
  }

  handleUpdateInput( text ) {
    this.setState({
      searchText: text
    });
  }

  handleSelect( text ) {
    this.handleUpdateInput( text );
    this.navigateToVideo( text );
  }

  handleChangeSection( section ) {
    this.setState({
      section,
      searchText: ''
    });
  }

  navigateToVideo( selected ) {
    const {
      options
    } = this.props;

    const keys = Object.keys( options );
    const sel = keys.filter(( key ) => options[ key ].title === selected );

    if ( sel.length ) {
      this.props.navigateTo( this.props.section, sel[ 0 ] );
    }
  }

  shouldComponentUpdate( nextProp, nextState ) {
    if ( nextProp.section !== nextState.section ) {
      this.handleChangeSection( nextProp.section );
    }
    return true;
  }

  render() {
    const {
      options,
      section,
      value
    } = this.props;

    const placeHolder = value ?
      value :
      `Prova con "${options[ Object.keys( options )[ 0 ]].title}"`;

    let menuProps;
    if ( this.props.dropDownHeight ) {
      menuProps = {
        maxHeight: this.props.dropDownHeight
      };
    }

    return (
      <div
        style={ style.autocomplete.container }
      >
        <AutoComplete
          onFocus={ this.onFocus.bind( this ) }
          menuProps={ menuProps }
          id={ `search-${section}` }
          searchText={ this.state.searchText }
          fullWidth={ true }
          hintText={ placeHolder }
          dataSource={ Object.keys( options ).map( item => options[ item ].title ) }
          filter={ AutoComplete.caseInsensitiveFilter }
          openOnFocus={ true }
          onUpdateInput={ this.handleUpdateInput.bind( this ) }
          onNewRequest={ this.handleSelect.bind( this ) }
        />
      </div>
    );
  }
}

BorisAutoComplete.propTypes = {
  options: React.PropTypes.objectOf( props.video ).isRequired,
  navigateTo: React.PropTypes.func.isRequired,
  section: React.PropTypes.string,
  value: React.PropTypes.string,
  dropDownHeight: React.PropTypes.number
};
