import React, {Component} from 'react';
import {Col, Layout, Row} from 'antd';
import "./static/signUp.css";
import { Form, Input, Button, Checkbox } from 'antd';
import {UserOutlined, LockOutlined, QuestionCircleFilled} from '@ant-design/icons';
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import Radio from "antd/es/radio/radio";
const { Header, Footer, Sider, Content } = Layout;


const onFinish = (values) => {
    console.log('Received values of form: ', values);
};

class SignUpPage extends Component {
    render() {
        return (

                <Row>
                    <Col span={8}>
                        <div class="sidebar">
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
                            <h2>Welcome, please sign up your account</h2>
                            <Form name="normal_login" className="login-form" initialValues={{remember: true}} onFinish={onFinish}>
                                <Form.Item name="username"
                                           rules={[{required: true, message: 'Please input your Username!'}]}>
                                    <p>username:</p>
                                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                           placeholder="Username"/>
                                </Form.Item>

                                <Form.Item name="e-mail"
                                           rules={[{required: true, message: 'Please input your E-mail address!'}]}>
                                    <p>E-mail:</p>
                                    <Input prefix={<UserOutlined className="site-form-item-icon"/>}
                                           placeholder="Email"/>
                                </Form.Item>
                                <Row>
                                    <Col span={11}>
                                        <Form.Item name="password"
                                                   rules={[{required: true, message: 'Please input your Password!'}]}>
                                            <p>password:</p>
                                            <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password"
                                                   placeholder="Password"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={2}/>
                                    <Col span={11}>
                                        <Form.Item name="password"
                                                   rules={[{required: true, message: 'Please input your Password!'}]}>
                                            <p>password:</p>
                                            <Input prefix={<LockOutlined className="site-form-item-icon"/>} type="password"
                                                   placeholder="Password"/>
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
                                    <Button type="primary" htmlType="submit" className="login-form-button"><p>Sign Up</p></Button>
                                </Form.Item>
                            </Form>
                            <button type='primary' icon={<UserOutlined/>} onClick={() => {window.location.href = "http://localhost:3000"}}>
                                Login in
                            </button>
                            </div>
                        </div>
                    </Col>
                </Row>
        );
    }
}

export default SignUpPage;