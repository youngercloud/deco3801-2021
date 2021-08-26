import React, {Component} from 'react';
import {withRouter} from "react-router";
import axios from 'axios'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {name: ""};
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div>
                <h2>TEST BACK FROM BACKEND</h2>
                <ul>
                    <li>{this.state.name}</li>
                </ul>;
            </div>
        );
    }

    getData = () => {
        let api = "/api/signup"
        axios.post(api, {
            firstName: 'Fred',
            PhoneNumber: 123124
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
    }

}

export default withRouter(User);