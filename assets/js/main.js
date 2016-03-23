import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from 'js/app';
import ClipBoard from 'clipboard';
import { Router, Route, browserHistory } from 'react-router';

injectTapEventPlugin();

const data = JSON.parse( document.getElementById( 'data' ).innerHTML );

class Main extends React.Component {
  render() {
    return (
      <App
        navigateTo={browserHistory.push}
        data={data}
        selected={this.props.params.selected}
        format={this.props.params.format}
        onCopyReady={function( selector ) {
          new ClipBoard( selector );
        }} />
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="/:selected" component={Main}/>
      <Route path="/:selected/:format" component={Main}/>
    </Route>
  </Router>
), document.getElementById( 'app' ));
