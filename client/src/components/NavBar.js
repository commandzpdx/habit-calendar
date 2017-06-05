import React from 'react';
import styles from './NavBar.css';

export default function NavBar() {
  return (
    <nav className={styles.bar}>
      <div className={styles.logo}>logo</div>
      <ul> 
        <li className={styles.link}>home</li>
        <li className={styles.link}>signup</li>
      </ul>
    </nav>
  )
}