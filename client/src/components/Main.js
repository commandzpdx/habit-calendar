import React from 'react';
import { Route } from 'react-router-dom';
import SignIn from './SignIn';
import Home from './Home';

export default function Main() {
  return (
    <main>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
    </main>
  );
}
