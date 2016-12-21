import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import Members from './components/Members';
import Admin from './components/Admin';
import App from './App';
import NoMatch from './components/NoMatch';
import './index.css';

ReactDOM.render((
	<Router history={browserHistory}>
    <Route path="/" component={Members} />
    <Route path="/user/:member" component={App}/>
    <Route path="/admin" component={Admin}/>
    <Route path="*" component={NoMatch}/>
  </Router>
	), document.getElementById('root')
);
