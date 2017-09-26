import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './libraries/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
