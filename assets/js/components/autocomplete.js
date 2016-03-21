import React from 'react';
import ReactDOM from 'react-dom';
import AutoComplete from 'material-ui/lib/auto-complete';

export default class BorisAutoComplete extends React.Component {
  render() {
    var placeHolder = this.props.data[ 0 ];
    return (
      <AutoComplete
        hintText={`Prova con ${placeHolder}`}
        dataSource={this.props.data}
        onNewRequest={this.props.onSelect} />
    );
  }
}
