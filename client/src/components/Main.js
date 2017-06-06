import React from 'react';
import { Route } from 'react-router-dom';
import SignIn from './SignIn';

export default function Main() {
  return (
    <main>
      <Route path="/signin" component={SignIn} />
    </main>
  );
}
