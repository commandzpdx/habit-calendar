import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './NavBar.css';

export default function NavBar(props) {
  const handleSignOut = () => {
    props.updateState({
      name: '',
      signedIn: false,
      token: '',
    }, () => { props.history.push('/'); });
  };

  return (
    <nav className={styles.bar}>
      <div className={styles.logo}><Link to="/">logo goes to home</Link></div>
      <ul>
        {props.signedIn ? (
          <li className={styles.link}>
            <button onClick={handleSignOut}>sign out</button>
          </li>
        ) : (
          <li className={styles.link}><Link to="/signin">signin</Link></li>
        )}
      </ul>
    </nav>
  );
}

NavBar.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  updateState: PropTypes.func.isRequired,
};
