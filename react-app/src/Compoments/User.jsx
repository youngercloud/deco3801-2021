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
        let api = "/api/CaoCao"
        axios.get(api).then((response) => {
            this.setState({name: response.data.name})
        }).catch(function (err) {console.log(err)});
    }
}

export default withRouter(User);