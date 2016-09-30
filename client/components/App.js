import ReactDOM from 'react-dom';
import React from 'react';
import { Link, IndexLink } from 'react-router';
const ACTIVE = { color: 'red' };

// Import stylesheet
import skeleton from 'skeleton-css/css/skeleton.css';
import normalize from 'skeleton-css/css/normalize.css';
import styles from './App.css';

class App extends React.Component {
  render() {
    return  (
      <div className={`${styles['content']} ${skeleton['container']}`}>
        <header className={styles['header']}>
          <h1><small>face</small> vote</h1>
        </header>
        <nav className="navbar">
            <ul className={styles['navbarList']}>
              <li className={styles['navbarItem']}><IndexLink to="/" className={styles['textMenu']} activeStyle={ACTIVE}>VOTE</IndexLink></li>
              <li className={styles['navbarItem']}><Link to="/rank" className={styles['textMenu']} activeStyle={ACTIVE}>RANK</Link></li>
              <li className={styles['navbarItem']}><Link to="/log" className={styles['textMenu']} activeStyle={ACTIVE}>LOG</Link></li>
            </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default App;