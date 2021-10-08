import React, {Component} from 'react';
// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import {Input, MessageList, MessageBox} from 'react-chat-elements'
import {Button, Card, Col, Row, Select, Space} from "antd";
import './static/arginote.css'
import goodman from "../../Images/goodman.jpeg";
import {SendOutlined} from "@ant-design/icons";
import {Option} from "antd/es/mentions";


const {Meta} = Card;

class ChatArea extends Component {
    render() {
        const GP_LIST =["Česky", "Dansk", "Deutsch", "English", "Español", "Ελληνική", "Français", "Italiano",
            "Nederlands", "Русский", "简体中文", "繁體中文", "한국어", "日本語"];
        const info = GP_LIST.map((d) => <Option value={d} key={d}>{d}</Option>);
        return (
            <div className="chat-area">
                <div className="chat-area-content">
                    <MessageList
                        className='message-list'
                        lockable={true}
                        downButton={true}
                        toBottomHeight={'100%'}
                        dataSource={[ {
                                position: 'right',
                                type: 'text',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                date: new Date(),
                            }, {
                                position: 'right',
                                type: 'text',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                date: new Date(),
                            }, {
                            position: 'right',
                            type: 'text',
                            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                            date: new Date(),
                            }
                            , {
                                position: 'right',
                                type: 'text',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                date: new Date(),
                            }
                            , {
                                position: 'right',
                                type: 'text',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                date: new Date(),
                            }
                            , {
                                position: 'right',
                                type: 'text',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                date: new Date(),
                            }, {
                                position: 'right',
                                type: 'text',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                date: new Date(),
                            }, {
                                position: 'right',
                                type: 'text',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                date: new Date(),
                            }, {
                                position: 'right',
                                type: 'text',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                date: new Date(),
                            }, {
                                position: 'right',
                                type: 'text',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                date: new Date(),
                            }, {
                                position: 'right',
                                type: 'text',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                date: new Date(),
                            }, {
                                position: 'right',
                                type: 'text',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                date: new Date(),
                            }, {
                                position: 'right',
                                type: 'text',
                                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
                                date: new Date(),
                            }]}/>
                </div>
                <div>

                    <Select
                        className="chat-language-select"
                        showSearch
                        placeholder="Select a Language"
                        optionFilterProp="children"
                        onChange={(v) => {
                            this.setState({select: v})
                        }}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {info}
                    </Select>
                    <Input
                        placeholder="Message"
                        className="chat-input"
                        rightButtons={
                            <Button type="primary" icon={<SendOutlined style={{
                                position: "relative",
                                left: "10px", top: '5px'
                            }}/>} size="large">
                            </Button>}/>
                </div>
            </div>
        )
    }
}

export default class MyBooking extends Component {

    constructor() {
        super();
    }

    state = {selectDoctor: null};

    doctorSelect = (e) => {
        if (this.state.selectDoctor != null) {
            this.state.selectDoctor.style.border = 'none';
        }
        this.setState({selectDoctor: e.currentTarget})
        e.currentTarget.style.border = 'green solid 2px';
    }

    render() {
        return (
            <div className="booking-main">
                <Row>
                    <Col span={10}>
                        <Space direction="vertical" size={36} className="booking-space-justify">
                            <Card
                                onClick={(e) => {
                                    this.doctorSelect(e)
                                }}
                                style={{width: 300}}
                                cover={
                                    <img
                                        alt="example"
                                        src={goodman}
                                    />
                                }>
                                <Meta
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                            <Card
                                style={{width: 300}}
                                onClick={(e) => {
                                    this.doctorSelect(e)
                                }}
                                cover={
                                    <img
                                        alt="example"
                                        src={goodman}
                                    />
                                }>
                                <Meta
                                    title="Card title"
                                    description="This is the description"
                                />
                            </Card>
                        </Space>
                    </Col>
                    <Col span={14}>
                        <Space direction="vertical" size={36} className="booking-space-justify" style={{width: '100%'}}>
                            <ChatArea/>
                        </Space>
                    </Col>
                </Row>
            </div>
        );
    }
}