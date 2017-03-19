import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import Members from './components/Members';
import Admin from './components/Admin';
import App from './App';
import Cart from './components/Cart';
import NoMatch from './components/NoMatch';

ReactDOM.render((
	<Router history={browserHistory} basename="/bccbc/">
    <Route path="/" component={App} />
    <Route path="/user/:member" component={App}/>
    <Route path="/cart" component={Cart}/>
    <Route path="/login" component={Members} />
    <Route path="/admin" component={Admin}/>
    <Route path="*" component={NoMatch}/>
  </Router>
	), document.getElementById('root')
);
