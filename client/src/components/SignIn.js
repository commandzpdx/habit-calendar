import React from 'react';
import styles from './SignIn.css';

export default function SignIn() {
  return (
    <div>
      <h1>Sign in:</h1>
      <form>
        <input type="text" placeholder="email" required />
        <br />
        <input type="text" placeholder="password" required />
        <br />
        <button>submit</button>
      </form>
    </div>
  );
}

