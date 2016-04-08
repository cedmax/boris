import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from 'js/app';
import ClipBoard from 'clipboard';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

injectTapEventPlugin();

const data = JSON.parse( document.getElementById( 'data' ).innerHTML );

function navigateTo() {
  let args = Array.prototype.slice.call( arguments );
  browserHistory.push( '/' + args.join( '/' ));
}

function getAvailableDropDownSpace(){
  return document.body.clientHeight - 200;
}

class Main extends React.Component {
  render() {
    return (
      <App
        navigateTo={navigateTo}
        data={data}
        category={this.props.params.category}
        selected={this.props.params.selected}
        format={this.props.params.format}
        onCopyReady={function( selector ) {
          new ClipBoard( selector );
        }}
        dropDownHeight={getAvailableDropDownSpace()}
        staticContent={document.getElementById( 'about' ).innerHTML}
        />
    );
  }
}

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" >
      <IndexRoute component={Main} />
      <Route path="/:category" component={Main}/>
      <Route path="/:category/:selected" component={Main}/>
      <Route path="/:category/:selected/:format" component={Main}/>
    </Route>
  </Router>
), document.getElementById( 'app' ));
