import React from 'react';

// Import components
import Menu from './components/Menu/Menu';

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
        <Menu />
        {this.props.children}
        <footer>
          <small>Created by <a href="http://putuyoga.com">I Putu Yoga Permana</a> &middot; source at <a href="https://github.com/putuyoga/facelv">github</a></small>
        </footer>
      </div>
    );
  }
}

export default App;