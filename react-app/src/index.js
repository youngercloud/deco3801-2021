import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import reportWebVitals from './reportWebVitals';
import User from "./Compoments/User";

ReactDOM.render(
    <Router history={history} forceRefresh={true} >
        <Switch>
            <Route exact path="/" component={ App }/>
            <Route path="/user123" component={User}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
