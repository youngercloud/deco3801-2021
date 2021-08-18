import React, {Component} from 'react';
import { Menu, Row, Col, Icon, Button, Popover, Badge, Space } from 'antd';
import { Image } from 'antd';
import "./static/header.css"
import { Link } from 'react-router-dom';
import {FacebookFilled, InstagramFilled, TwitterCircleFilled} from "@ant-design/icons";

export default class Header extends Component {
    render() {
        return (
            <header className="header">
                <Row align="middle" className="upper">
                    <Col span={18}/>
                    <Col span={3}>
                        <Space size="middle" className="social-media">
                            <FacebookFilled />
                            <TwitterCircleFilled />
                            <InstagramFilled />
                        </Space>
                    </Col>
                    <Col span={3}/>
                </Row>
                <Row align="middle" justify="space-around">
                    <Col span={4}/>
                    <Col span={4} >
                        <Image
                            preview={false}
                            width={200}
                            height={70}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </Col>
                    <Col span={8}>
                        <Menu className="menu"  selectable={false} theme="dark" onClick={this.handleClick} mode="horizontal">
                            <Menu.Item key="mail">
                                Navigation One
                            </Menu.Item>
                            <Menu.Item key="app">
                                Navigation Two
                            </Menu.Item>
                            <Menu.Item key="user">
                                <Link to="/user123">TESTONLY</Link>
                            </Menu.Item>
                        </Menu>
                    </Col>

                    <Col span={2}>
                        <Space size="middle">
                            <Button ghost>Login</Button>
                            <Button>SIGN UP</Button>
                        </Space>
                    </Col>
                    <Col span={4}/>
                </Row>

            </header>

        );
    }
}
