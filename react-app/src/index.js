import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import User from "./Compoments/User";

ReactDOM.render(
    <Router history={history} forceRefresh={true} >
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/user123" component={User}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);