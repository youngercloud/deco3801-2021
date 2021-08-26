import React, {Component} from 'react';
import Home from './Page/HomePage/Home'
import LoginPage from "./Page/LoginPage/LoginPage";
import SignUpPage from "./Page/SignUpPage/SignUpPage";
import UserPage from "./Compoments/User";
class App extends Component {
    render() {
        return (
            <div>
                {/*<UserPage/>*/}
                {/*<Home/>*/}
                {/*<LoginPage/>*/}
                <SignUpPage/>
            </div>
        );
    }
}

export default App;
