import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Root from './components/Root';
import {createStore} from 'redux'
import reducer from './reducers'
import {Provider} from 'react-redux'

const store=createStore(reducer)
ReactDOM.render(<Root store={store} />,document.getElementById('root'));
registerServiceWorker();