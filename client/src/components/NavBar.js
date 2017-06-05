import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.css';

export default function NavBar() {
  return (
    <nav className={styles.bar}>
      <div className={styles.logo}>logo</div>
      <ul>
        <li className={styles.link}><Link to="/">home</Link></li>
        <li className={styles.link}><Link to="/signin">signin</Link></li>
      </ul>
    </nav>
  );
}
