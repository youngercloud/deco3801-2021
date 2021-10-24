import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Route, Router, Switch} from 'react-router-dom';
import history from './history';
import SignUpPage from "./Page/SignUpPage/SignUpPage";
import LoginPage from "./Page/LoginPage/LoginPage";
import demo from "./Page/DemoPage/demo";


ReactDOM.render(
    <Router history={history} forceRefresh={true}>
        <Switch>
            <Route path="/SignUpPage" component={SignUpPage}/>
            <Route path="/login" component={LoginPage}/>
            <Route path="/" component={demo}/>
        </Switch>
    </Router>,
    document.getElementById('root'));
