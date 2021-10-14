import React, {Component} from 'react';
// RCE CSS
import 'react-chat-elements/dist/main.css';
// MessageBox component
import {MessageList} from 'react-chat-elements'

import {Button, Card, Col, Input as AntdInput, Row, Select, Space} from "antd";
import './static/arginote.css'
import goodman from "../../Images/goodman.jpeg";
import {SendOutlined} from "@ant-design/icons";
import {Option} from "antd/es/mentions";
import axios from "axios";
import Paragraph from "antd/es/typography/Paragraph";
let key = require('../../privateData.json');
const googleTranslate = require("google-translate")(key[0].keyTranslate);
const {Meta} = Card;

class ChatArea extends Component {

    constructor() {
        super();
        this.inputReference = React.createRef();
    }

    state = {
        languageCodes: [],
        input: "",
        dataSource: []
    }

    componentDidMount() {
        // load all of the language options from Google Translate to your app state

        googleTranslate.getSupportedLanguages("en", function (err, languageCodes) {
            getLanguageCodes(languageCodes); // use a callback function to setState
        });

        const getLanguageCodes = languageCodes => {
            this.setState({languageCodes});
        };
    }

    translateInput = language => {
        let {input} = this.state;
        let transInput = "";

        const translating = transInput => {
            if (input !== transInput) {
                this.setState({input: transInput});
                // this.forceUpdate()
            }
        };

        googleTranslate.translate(input, language, function (err, translation) {
            transInput = translation.translatedText;
            translating(transInput);
        });
        this.setState({language});
    };


    sendMessage(e, msg) {
        // this.props.handleSendMessage(e, msg)
        let newData = this.state.dataSource
        newData.push({
                position: 'right',
                type: 'text',
                text: msg['content'],
                date: new Date(),
            }
        );
        this.setState({dataSource: newData})
    }

    render() {
        const {languageCodes, language} = this.state;
        const GP_LIST = ["Česky", "Dansk", "Deutsch", "English", "Español", "Ελληνική", "Français", "Italiano",
            "Nederlands", "Русский", "简体中文", "繁體中文", "한국어", "日本語"];
        const info = GP_LIST.map(
            (d) => <Option value={d} key={d}>{d}</Option>
        );
        const orig = languageCodes.map(
            lang => <Option key={lang.language} value={lang.language}>{lang.name}</Option>
        )
        return (
            <div className="chat-area">
                <div className="chat-area-content">
                    <MessageList
                        className='message-list'
                        lockable={true}
                        downButton={true}
                        toBottomHeight={'100%'}
                        dataSource={this.state.dataSource}
                    />
                </div>
                <div>
                    <Select
                        className="chat-language-select"
                        style={{width:"30%"}}
                        showSearch
                        placeholder="Select a Language"
                        optionFilterProp="children"
                        value={language}
                        onChange={(e) => {
                            this.translateInput(e)
                        }}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }>
                        {orig}
                    </Select>
                    <AntdInput
                        placeholder="Message"
                        className="chat-input-original"
                        onChange={(e) => {
                            this.setState({
                                "input": e.target.value,
                            })
                        }}/>

                    <AntdInput
                        value={this.state.input}
                        disabled={true}
                        style={{marginTop: 10,backgroundColor:"#D9E9EE",}}
                        placeholder="Choose the language for translation"
                        className="chat-input-translated"/>
                    <Button
                        onClick={(e) => this.sendMessage(e,
                            {'content': this.state.input , 'type': 'user'})}
                        style={{marginTop: 20}} type="primary" size="large">
                    Send Translated Message </Button>
                </div>
            </div>
        )
    }
}



export default class MyBooking extends Component {

    constructor() {
        super();
    }

    doctorData;

    state = {
        selectDoctor: null,
        socket: null,
    };

    doctorSelect = (e) => {
        if (this.state.selectDoctor != null) {
            this.state.selectDoctor.style.border = 'none';
        }
        this.setState({selectDoctor: e.currentTarget})
        e.currentTarget.style.border = 'green solid 2px';
    }

    handleSendMessage(event, message){
        let data = JSON.stringify(message);
    }

    componentDidMount() {
        let api = "/api/userBookings"
        axios.post(api,
            {'UserName': sessionStorage.getItem('name')}).then((response) => {
            let json = response.data;

            const arr = [];
            let arr2 = [];
            Object.keys(json).forEach(function(key) {
                arr.push(json[key]);
            });
            arr2 = arr[0];
            this.doctorData = arr2.map((d) =>
                <Col span={8} className="doctor-selection-box">
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
                            title={d.FirstName + " " + d.LastName}
                            description={
                                <Paragraph>
                                    <ul>
                                        <li>
                                            {d.GpName}
                                        </li>
                                        <li>
                                            {d.DocLanguage}
                                        </li>
                                        <li>
                                            {d.BookingTime}
                                        </li>
                                    </ul>
                                </Paragraph>
                            }
                        />
                    </Card>
                </Col>
            )
            console.log(arr2)
            this.forceUpdate()
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="booking-main">
                <Row>
                    <Col span={10}>
                        <Space direction="vertical" size={36} className="booking-space-justify">
                            {this.doctorData}
                        </Space>
                    </Col>
                    <Col span={14}>
                        <Space direction="vertical" size={36} className="booking-space-justify" style={{width: '100%'}}>
                            <ChatArea handleSendMessage={(e, m) => {this.handleSendMessage(e, m)}}/>
                        </Space>
                    </Col>
                </Row>
            </div>
        );
    }
}