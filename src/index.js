import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import store from './store';


ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>,document.getElementById('root'));
registerServiceWorker();