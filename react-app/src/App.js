import React, {Component} from 'react';
import Home from './Page/HomePage/Home'
import LoginPage from "./Page/LoginPage/LoginPage";
class App extends Component {
    render() {
        return (
            <div>
                <Home/>
                {/*<LoginPage/>*/}
            </div>
        );
    }
}

export default App;
