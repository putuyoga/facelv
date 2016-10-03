/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

export default (
  <Route path="/" component={App}>
    <IndexRoute
        getComponent={(nextState, callback) => {
            require.ensure([], require => {
            callback(null, require('./modules/Vote/pages/FaceListPage/FaceListPage').default);
            });
        }}
    />
    <Route
        path="/rank"
        getComponent={(nextState, callback) => {
        require.ensure([], require => {
            callback(null, require('./modules/Rank/pages/StandingsPage/StandingsPage').default);
        });
      }}
    />
    <Route path="*"         
            getComponent={(nextState, callback) => {
            require.ensure([], require => {
                callback(null, require('./components/NotFound').default);
            });
      }} />
  </Route>
);