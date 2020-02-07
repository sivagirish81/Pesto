import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
        <Router>
            <Route path = "/" component={App} />
        </Router>
        , document.getElementById('root')
    );


serviceWorker.unregister();
