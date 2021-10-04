import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import User from "./Compoments/User";
import Home from './Page/MainPage/MainPage';
import SignUpPage from "./Page/SignUpPage/SignUpPage";
import LoginPage from "./Page/LoginPage/LoginPage";
import demo from "./Page/DemoPage/demo";
import main from "./Page/MainPage/MainPage";


ReactDOM.render(
    <Router history={history} forceRefresh={true} >
        <Switch>
            <Route exact path="/" component={App}/>
            <Route  path="/SignUpPage" component={SignUpPage}/>
            <Route  path="/login" component={LoginPage}/>
            <Route  path="/home" component={Home}/>
            <Route path="/user123" component={User}/>
            <Route path="/demo" component={demo}/>
            <Route path="/main" component={main}/>
        </Switch>
    </Router>,
    document.getElementById('root'));
