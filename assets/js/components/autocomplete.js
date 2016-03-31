import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';

export default class BorisAutoComplete extends React.Component {
  render() {
    var placeHolder = this.props.data[ 0 ];
    return (
      <div style={{
        minWidth: '250px',
        width: '40%',
        margin: 'auto'
      }}>
        <AutoComplete
          fullWidth={true}
          id={this.props.id}
          hintText={this.props.value ? this.props.value : `Prova con ${placeHolder}`}
          dataSource={this.props.data}
          filter={AutoComplete.caseInsensitiveFilter}
          onNewRequest={this.props.onSelect} />
      </div>
    );
  }
}
