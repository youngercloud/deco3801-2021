import React, {Component} from 'react';
import {  Col, Layout, Row} from 'antd';
import "./static/login.css";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Radio from "antd/es/radio/radio";
import axios from "axios";

const onFinish = (values) => {
    console.log('Received values of form: ', values);
};


class LoginPage extends Component {
    constructor(opt) {
        super(opt);
        this.state={
            Name:'',
            Password:'',
            currentUser: '1',
            validation:'',
        };
    }

    handlerChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    };

    test = (e) => {
        if (this.state.Name!=null && this.state.Password!=null){
            let api;
            if (this.state.currentUser==="1"){
                api = "/api/login/user"
            }else {
                api = "/api/login/doctor"
            }
            axios.post(api, e).then((response) => {
                if (response.data.validation === true){
                    sessionStorage.setItem("name",this.state.Name);
                    sessionStorage.setItem("password",this.state.Password);
                    window.location.href = "http://localhost:3000/demo";
                }else if (response.data.validation === false){
                    window.location.href = "http://localhost:3000/login";
                    alert("sorry, the password is incorrect or account not exists")
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            alert("please, complete the form.")
        }
    };

    demo2 = () => {
        const value = sessionStorage.getItem("name");
        alert(value);
    }

    render() {
        return (
            <Row>
                <Col span={8}>
                    <div className="sidebar">
                    </div>
                </Col>
                <Col span={16}>
                    <div className="form-wrap">
                        <div>
                            <div id="signUp">
                                <button  type='primary' icon={<UserOutlined/>} onClick={() => {window.location.href = "http://localhost:3000/SignUpPage"}}>
                                    Sign up
                                </button>
                            </div>
                            <div className="form-content">
                                <Form name="normal_login" className="login-form" initialValues={{remember: true}}
                                      onFinish={onFinish}>
                                    <Form.Item name="username"
                                               rules={[{required: true, message: 'Please input your Username!'}]}>
                                        <p>Account name:</p>
                                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                               placeholder="Username"
                                               onChange={this.handlerChange}
                                               name="Name"
                                        />
                                    </Form.Item>
                                    <Form.Item name="password"
                                                       rules={[{required: true, message: 'Please input your Password!'}]}>
                                        <p>Password:</p>
                                        <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password"
                                               placeholder="Password"
                                               name="Password"
                                               onChange={this.handlerChange}
                                        />
                                    </Form.Item>

                                    <div>
                                        <Radio.Group  name="identity" defaultValue={1} >
                                            <Radio onClick={()=>this.setState({currentUser: "1"})} className="chosen" value={1}>User</Radio>
                                            <Radio onClick={()=>this.setState({currentUser: "2"})} className="chosen" value={2}>Clinic / Hospital</Radio>
                                        </Radio.Group>
                                    </div>

                                    <Button type="primary"  id="login-form-button" onClick={()=>this.test(this.state)}>
                                        <p>Log in</p>
                                    </Button>

                                </Form>
                                {/*<Button onClick={()=>this.demo2()}> <p>demo2</p> </Button>*/}
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>


        );
    }
}

export default LoginPage;