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
        // let dataPath = "/api/a"
        // //response.data == return 回来的东西
        // axios.get(dataPath).then((response) => {
        //     this.setState({name: response.data})
        // }).catch(function (err) {console.log(err)});

        let dataPath = "/api/asd"
        axios.post(dataPath, {
            "username": "Dollar0712",
            "email" : "124253645",
            "password": "123456789",
            "doubleCheck" : "afgaag"
        }).then(function(deliver) {
            console.log(deliver);})
        .catch(function (err) {console.log(err)});
    }

}

export default withRouter(User);