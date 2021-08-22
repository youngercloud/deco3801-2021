import React, {Component} from 'react';
import {Col, Layout, Row} from 'antd';
import "./static/signUp.css";
import { Form, Input, Button, Checkbox } from 'antd';
import {UserOutlined, LockOutlined, QuestionCircleFilled} from '@ant-design/icons';
import Radio from "antd/es/radio/radio";
import axios from "axios";


class SignUpPage extends Component {
    constructor(opt) {
        super(opt);
        this.state={
            Name:'',
            Mail:'',
            Validate:{
                Name:{
                    required:true,
                    validate:true,
                    minLen:6,
                    maxLen:10,
                    msg:"name must greater 6"
                }
            }
        };
    }

    handlerChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        },()=>{
           this.validateInput();
        });

    };

    handlerSubmit = (e) =>{
        e.preventDefault();
        this.validateInput();
        alert('d');
    };

    test = (e) =>{
        if (this.state.Validate.Name.validate===true){
            let api = "/api/signup"
            axios.post(api, e).then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        }
    };

    validateInput(){
        let {Name, Validate} = this.state;
        let temValidate = false;
        const len = Name.length;
        const min = Validate.Name.minLen;
        const max = Validate.Name.maxLen;
        if (len>= min && len<= max){
            temValidate = true;
        }
        this.setState(preState => {
            return Object.assign({},preState,{
                Validate:{
                    Name:Object.assign({},preState.Validate.Name,{
                        validate: temValidate,
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
                                <li>We’re professional medical platform</li>
                                <li>The most convenient medical booking</li>
                                <li>Quick self-diagnosis</li>
                            </ul>
                        </div>
                    </Col>
                    <Col span={16}>
                        <div className="form-wrap">
                            <div>
                                <div id="login">
                                    <button  type='primary' icon={<UserOutlined/>} onClick={() => {window.location.href = "http://localhost:3000"}}>
                                        Already a member? Log in
                                    </button>
                                </div>
                                <h2>Please sign up your account</h2>

                            <Form name="normal_login" className="login-form" initialValues={{remember: true}}  onSubmit={this.handlerSubmit}>
                                <Form.Item >
                                    <p>username:</p>
                                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                           placeholder="Username"
                                           onChange={this.handlerChange}
                                            name="Name"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <p>E-mail:</p>
                                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                           placeholder="Email"
                                           name="Mail"
                                           onChange={this.handlerChange}
                                    />
                                </Form.Item>
                                <Row>
                                    <Col span={11}>
                                        <Form.Item>
                                            <p>password:</p>
                                            <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password"
                                                   placeholder="Password" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}/>
                                    <Col span={11}>
                                        <Form.Item>
                                            <p>password:</p>
                                            <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password"
                                                   placeholder="Confirm password" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <div>
                                    <Radio.Group  name="identity" defaultValue={1} >
                                        <Radio value={1} ><p>User</p></Radio>
                                        <Radio value={2}><p>Clinic / Hospital</p></Radio>
                                    </Radio.Group>
                                </div>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" className="login-form-button" value="Submit" ><p>Sign Up</p></Button>
                                </Form.Item>
                            </Form>

                                <p>
                                    username:{this.state.Name} <br/>
                                    email to : {this.state.Mail}
                                </p>
                                {!this.state.Validate.Name.validate &&  <span style={{color:'red'}}>{this.state.Validate.Name.msg}</span>}

                                <Button onClick={(e)=>this.test(this.state)}>test</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
        );
    }
}

export default SignUpPage;