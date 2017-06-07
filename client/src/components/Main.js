import React from 'react';
import { Route } from 'react-router-dom';
import SignIn from './SignIn';
import Home from './Home';
import UserMain from './UserMain';
import UserSetUp from './UserSetUp';

export default function Main() {
  return (
    <main>
      <Route exact path="/" component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/firstname" component={UserMain} />
      <Route path="/setup" component={UserSetUp} />
    </main>
  );
}

//TODO: replace /firstname with /:firstname when backend is connected