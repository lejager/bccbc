import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import Members from './components/Members';
import App from './App';
import NoMatch from './components/NoMatch';
import './index.css';

ReactDOM.render((
	<Router history={browserHistory}>
    <Route path="/" component={Members} />
    <Route path="/:member" component={App}/>
    <Route path="*" component={NoMatch}/>
  </Router>
	), document.getElementById('root')
);
