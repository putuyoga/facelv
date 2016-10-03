import React from 'react';
import { Link, IndexLink } from 'react-router';

// Import stylesheet
import styles from './Menu.css';

class Menu extends React.Component {
    render() {
        return(
            <nav className="navbar">
                <ul className={styles['navbarList']}>
                    <li className={styles['navbarItem']}>
                        <IndexLink to="/" className={styles['textMenu']} activeClassName={styles['textMenuActive']}>VOTE</IndexLink>
                    </li>
                    <li className={styles['navbarItem']}>
                        <Link to="/rank" className={styles['textMenu']} activeClassName={styles['textMenuActive']}>RANK</Link>
                    </li>
                    <li className={styles['navbarItem']}>
                        <Link to="/log" className={styles['textMenu']} activeClassName={styles['textMenuActive']}>LOGIN</Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Menu;