import React from 'react';
//import styles from './SignIn.css';

export default function SignIn() {
  return (
    <div>
      <h1>Sign in:</h1>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <input type="text" placeholder="email" required />
        <br />
        <input type="text" placeholder="password" required />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

