import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from 'js/app';
import ClipBoard from 'clipboard';

injectTapEventPlugin();

const data = JSON.parse( document.getElementById( 'data' ).innerHTML );

ReactDOM.render(
  <App
    data={data}
    onCopyReady={function( selector ) {
      new ClipBoard( selector );
    }} />,
  document.getElementById( 'app' ));
