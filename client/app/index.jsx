import ReactDOM from 'react-dom';
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// import component
import App from './components/App';
import Facebox from './components/Facebox';
import Rank from './components/Rank';
import NotFound from './components/NotFound';

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Facebox} />
      <Route path="rank" component={Rank} />
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>
), document.getElementById('content'))