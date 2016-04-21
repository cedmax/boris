import React from 'react';

export default class SubmitDialog extends React.Component {
  render() {
    return (
      <div>
        <iframe
          style={ {
            'border': 0,
            'margin': 0,
            'padding': 0
          } }
          src="https://docs.google.com/forms/d/19X4C5OX0um7MK_L0nZosEutiPTbOUoRoUtRA-71LxtQ/viewform?embedded=true"
          width="100%"
          height="80%">
          Loading...
        </iframe>
      </div>
    );
  }
}
