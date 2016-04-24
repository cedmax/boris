import React from 'react';
import style from 'js/style';

export default class SubmitDialog extends React.Component {
  render() {
    return (
      <div>
        <iframe
          style={ style.submitDialog.main }
          src="https://docs.google.com/forms/d/19X4C5OX0um7MK_L0nZosEutiPTbOUoRoUtRA-71LxtQ/viewform?embedded=true"
          width="100%"
          height="80%">
          Loading...
        </iframe>
      </div>
    );
  }
}
