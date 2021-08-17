import React, {Component} from 'react';
import Home from './Page/HomePage/Home'
import LoginPage from "./Page/LoginPage/LoginPage";
import SignUpPage from "./Page/SignUpPage/SignUpPage";
class App extends Component {
    render() {
        return (
            <div>
                {/*<Home/>*/}
                <LoginPage/>
                {/*<SignUpPage/>*/}
            </div>
        );
    }
}

export default App;
