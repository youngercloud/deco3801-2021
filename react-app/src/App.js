import React, {Component} from 'react';
import Home from './Page/HomePage/Home';
import LoginPage from "./Page/LoginPage/LoginPage";
import SignUpPage from "./Page/SignUpPage/SignUpPage";
import UserPage from "./Compoments/User";
import MainPage from "./Page/MainPage/MainPage";

class App extends Component {
    render() {
        return (
            <div>
                {/*<Home/>*/}
                {/*<LoginPage/>*/}
                {/*<SignUpPage/>*/}
                {/*<UserPage/>*/}
                <MainPage/>
            </div>
        );
    }
}

export default App;
