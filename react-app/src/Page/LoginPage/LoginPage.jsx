import React, {Component} from 'react';
import {  Col, Layout, Row} from 'antd';
import "./static/login.css";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Radio from "antd/es/radio/radio";
const { Header, Footer, Sider, Content } = Layout;

const onFinish = (values) => {
    console.log('Received values of form: ', values);
};


class LoginPage extends Component {
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
                            <div className="form-header">
                                <h2>Welcome, please login in with your account</h2>
                            </div>
                            <div className="form-content">
                                <Form name="normal_login" className="login-form" initialValues={{remember: true}}
                                      onFinish={onFinish}>
                                    <Form.Item name="username"
                                               rules={[{required: true, message: 'Please input your Username!'}]}>
                                        <p>username:</p>
                                        <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                               placeholder="Username"/>
                                    </Form.Item>
                                    <Row>
                                        <Col span={12}>
                                            <Form.Item name="password"
                                                       rules={[{required: true, message: 'Please input your Password!'}]}>
                                                <p>password:</p>
                                                <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password"
                                                       placeholder="Password"/>
                                            </Form.Item>
                                        </Col>
                                        <Col/>
                                    </Row>

                                    <div>
                                        <Radio.Group  name="identity" defaultValue={1} >

                                            <Radio value={1} ><p>User</p></Radio>
                                            <Radio value={2}><p>Clinic / Hospital</p></Radio>
                                        </Radio.Group>
                                    </div>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="login-form-button">
                                            <p>Log in</p>
                                        </Button>
                                    </Form.Item>
                                </Form>

                            </div>
                        </div>
                    </div>
                </Col>
            </Row>


        );
    }
}

export default LoginPage;