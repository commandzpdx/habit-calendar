import React from 'react';

export default function SignUpForm() {
  return (
    <div>
      <h3>Sign up:</h3>
      <form>
        <input type="text" placeholder="first name" required />
        <br />
        <input type="text" placeholder="last name" required />
        <br />
        <input type="text" placeholder="email" required />
        <br />
        <input type="text" placeholder="password" required />
        <br />
        <button>submit</button>
      </form>
    </div>
  );
}
