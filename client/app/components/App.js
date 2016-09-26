import ReactDOM from 'react-dom';
import React from 'react';
import { Link, IndexLink } from 'react-router';
const ACTIVE = { color: 'red' };

class App extends React.Component {
  render() {
    return  (
      <div className="container">
        <header className="page-header">
          <h1><small>face</small> vote</h1>
        </header>
        <nav className="navbar">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-9">
              <ul className="nav navbar-nav">
                <li><IndexLink to="/" activeStyle={ACTIVE}>VOTE</IndexLink></li>
                <li><Link to="/rank" activeStyle={ACTIVE}>RANK</Link></li>
                <li><Link to="/log" activeStyle={ACTIVE}>LOG</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default App;