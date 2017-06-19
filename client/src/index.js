import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';

axios.get('/contests').then(res => {
  ReactDOM.render(<App initialData={res.data} />, document.getElementById('root'));
});

registerServiceWorker();
