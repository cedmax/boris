import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from 'js/app';
import ClipBoard from 'clipboard';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

injectTapEventPlugin();

const data = JSON.parse( document.getElementById( 'data' ).innerHTML );

function navigateTo() {
  let args = Array.prototype.slice.call( arguments ).filter( arg => arg );

  browserHistory.push( `/${( args.length ? args.join( '/' ) : '' )}` );
}

function getAvailableDropDownSpace() {
  return document.body.clientHeight - 200;
}

class Main extends React.Component {
  render() {
    return (
      <App
        navigateTo={ navigateTo }
        data={ data }
        section={ this.props.params.section }
        selected={ this.props.params.selected }
        format={ this.props.params.format }
        onCopyReady={ function( selector ) {
          new ClipBoard( selector );
        } }
        dropDownHeight={ getAvailableDropDownSpace() }
      />
    );
  }
}

Main.propTypes = {
  params: React.PropTypes.objectOf( React.PropTypes.string ).isRequired
};

ReactDOM.render((
  <Router
    history={ browserHistory }
  >
    <Route
      path="/"
    >
      <IndexRoute
        component={ Main }
      />
      <Route
        path="/:section"
        component={ Main }
      />
      <Route
        path="/:section/:selected"
        component={ Main }
      />
      <Route
        path="/:section/:selected/:format"
        component={ Main }
      />
    </Route>
  </Router>
), document.getElementById( 'app' ));
