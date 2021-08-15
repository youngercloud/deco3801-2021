import React, {Component} from 'react';
import { Layout } from 'antd';
import "./static/login.css";
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

const onFinish = (values) => {
    console.log('Received values of form: ', values);
};


class LoginPage extends Component {
    render() {
        return (
            <div class="form-wrap">
                <div>
                    <div class="form-header">
                        <span>Welcome, please login in with your account</span>
                    </div>
                    <div class="form-content">
                        <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
                            <Form.Item name="username" rules={[{ required: true, message: 'Please input your Username!' }]}>
                                <p>username:</p>
                                <Input  prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>

                            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                                <p>password:</p>
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password"/>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;