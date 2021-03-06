import React, {Component} from 'react';
import {Button, Col, Form, Input, Row} from 'antd';
import "./static/signUp.css";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import Radio from "antd/es/radio/radio";
import axios from "axios";

class SignUpPage extends Component {
    constructor(opt) {
        super(opt);
        this.state = {
            Name: '',
            Mail: '',
            Password: '',
            PasswordConfirm: '',
            Validate: {
                Password: {
                    required: true,
                    validate: true,
                    minLen: 6,
                    msg: "The length of the password must greater than 6.",
                },
            },
            currentUser: '1',
            enter: '',
        };
    }

    //record input to state
    handlerChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.validateInput();
        });
    };
    //send response to end-back
    test = (e) => {
        if (this.state.Name != null && this.state.Validate.Password.validate === true && this.state.Password === this.state.PasswordConfirm) {
            let api;
            if (this.state.currentUser === '1') {
                api = "/api/signup/user"
            } else {
                api = "/api/signup/doctor"
            }
            axios.post(api, e).then((response) => {
                if (response.data.creation === "true") {
                    sessionStorage.setItem("name", this.state.Name);
                    sessionStorage.setItem("password", this.state.Password);
                    window.location.href = "http://localhost:3000/demo";
                } else if (response.data.creation === "false") {
                    window.location.href = "http://localhost:3000/SignUpPage";
                    alert("sorry, the username exists")
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            alert("please, complete the form.")
        }
    };

    //check whether password is validate
    validateInput() {
        let {Password, Validate} = this.state;
        let passwordValidate = false;
        const Len = Password.length;
        const Min = Validate.Password.minLen;
        if (Len >= Min) {
            passwordValidate = true;
        }
        this.setState(preState => {
            return Object.assign({}, preState, {
                Validate: {
                    Password: Object.assign({}, preState.Validate.Password, {
                        validate: passwordValidate,
                    })
                }
            });
        })
    }

    render() {
        return (
            <Row>
                <Col span={8}>
                    <div className="sidebar">
                        <h1>Why our service?</h1>
                        <ul>
                            <li>We???re professional medical platform</li>
                            <li>The most convenient medical booking</li>
                            <li>Quick self-diagnosis</li>
                        </ul>
                    </div>
                </Col>
                <Col span={16}>
                    <div className="form-wrap">
                        <div>
                            <div id="login">
                                <button type='primary' icon={<UserOutlined/>} onClick={() => {
                                    window.location.href = "http://localhost:3000/login"
                                }}>
                                    Already a member? Log in
                                </button>
                            </div>
                            <div id="signForm">
                                <Form name="normal_login" className="sign-form" initialValues={{remember: true}}>
                                    <Form.Item>
                                        <p>Account name:</p>
                                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                               placeholder="Username"
                                               onChange={this.handlerChange}
                                               name="Name"
                                        />
                                    </Form.Item>

                                    <Form.Item>
                                        <p>Email address:</p>
                                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                               placeholder="Email"
                                               name="Mail"
                                               onChange={this.handlerChange}
                                        />
                                    </Form.Item>
                                    <Row>
                                        <Col span={11}>
                                            <Form.Item>
                                                <p>Password:</p>
                                                <Input prefix={<LockOutlined className="site-form-item-icon"/>}
                                                       type="password"
                                                       placeholder="Password"
                                                       name="Password"
                                                       onChange={this.handlerChange}
                                                />
                                                {!this.state.Validate.Password.validate &&
                                                <span style={{color: 'red'}}>{this.state.Validate.Password.msg}</span>}
                                            </Form.Item>
                                        </Col>
                                        <Col span={2}/>
                                        <Col span={11}>
                                            <Form.Item>
                                                <p>Confirm password:</p>
                                                <Input prefix={<LockOutlined className="site-form-item-icon"/>}
                                                       type="password"
                                                       placeholder="Confirm password"
                                                       name="PasswordConfirm"
                                                       onChange={this.handlerChange}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <div>
                                        <Radio.Group name="identity" defaultValue={1}>
                                            <Radio value={1} onClick={() => this.setState({currentUser: "1"})}
                                                   className="chosen">User</Radio>
                                            <Radio disabled value={2} onClick={() => this.setState({currentUser: "2"})}
                                                   className="chosen">Doctor</Radio>
                                        </Radio.Group>
                                    </div>

                                    <Button id="submit" onClick={() => this.test(this.state)}>
                                        <p>Sign up</p>
                                    </Button>

                                </Form>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

        );
    }
}

export default SignUpPage;