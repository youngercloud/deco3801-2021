import React, {Component} from 'react';
import {Row, Col, Button, Space, Input, Tooltip, Divider} from 'antd';
import "./static/style.css"
import {
    CommentOutlined,
    CompassOutlined,
    FieldTimeOutlined,
    PoweroffOutlined,
    SearchOutlined,
    WomanOutlined
} from "@ant-design/icons";
import { Steps } from 'antd';
import Gender from "./Gender";
import Location from "./Location";
import Language from "./Language";
import Time from "./Time";
const { Step } = Steps;

const onSearch = (value) => {
    console.log(value);
}

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languageDisplay: false,
            genderDisplay: false,
            locationDisplay: true,
            timeDisplay: false,
            languageStep: 'wait',
            genderStep: 'wait',
            locationStep: 'process',
            timeStep: 'wait',
        }
    }

    changeDisplayBack(name){
        console.log(name)
        if (name === 'Language') {
            this.setState({
                languageDisplay: false,
                genderDisplay: true,
                languageStep: 'wait',
                genderStep: 'process',
            })
        } else if (name === 'Gender') {
            this.setState({
                genderDisplay: false,
                locationDisplay: true,
                genderStep: 'wait',
                locationStep: 'process',
            })
        } else if (name === 'Time') {
            this.setState({
                timeDisplay: false,
                languageDisplay: true,
                timeStep: 'wait',
                languageStep: 'process',
            })
        }
    }

    changeDisplayNext(name){
        console.log(name)
        if (name === 'Location') {
            this.setState({
                locationDisplay: false,
                genderDisplay: true,
                locationStep: 'finish',
                genderStep: 'process',
            })
        } else if (name === 'Gender') {
            this.setState({
                genderDisplay: false,
                languageDisplay: true,
                genderStep: 'finish',
                languageStep: 'process',
            })
        } else if (name === 'Language') {
            this.setState({
                languageDisplay: false,
                timeDisplay: true,
                languageStep: 'finish',
                timeStep: 'process',
            })
        }
    }


    render() {
        return (
            <div>
                <Row>
                    <Col span={8}>
                        <div className="search">
                            <Space size="middle">
                                <Tooltip title="search" >
                                    <Button style={{height: 60, width: 60}} shape="square" icon={<SearchOutlined
                                        style={{fontSize: 32, position: "relative", left: '13px', top: '3px'}}/>} />
                                </Tooltip>
                                <Input placeholder="Search" style={{width: 200, height: 60}}/>
                            </Space>
                        </div>
                        <div className="division">
                            <span>Before</span>
                        </div>
                        <div className="before">
                            <Row style={{height: 300}}>
                                <Col span={8} className="centralization">
                                    <div className="item">
                                        Haha
                                    </div>
                                </Col>
                                <Col span={8} className="centralization">
                                    <div className="item">
                                        Haha
                                    </div>
                                </Col>
                                <Col span={8} className="centralization">
                                    <div className="item">
                                        Haha
                                    </div>
                                </Col>
                                <Col span={8} className="centralization">
                                    <div className="item">
                                        Haha
                                    </div>
                                </Col>
                                <Col span={8} className="centralization">
                                    <div className="item">
                                        Haha
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="division">
                            <span>During</span>
                        </div>
                        <div className="during">
                            <Row style={{height: 150}}>
                                <Col span={8} className="centralization">
                                    <div className="item">
                                        Haha
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="division">
                            <span>After</span>
                        </div>
                        <div className="after">
                            <Row style={{height: 150}}>
                                <Col span={8} className="centralization">
                                    <div className="item">
                                        Haha
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col span={16}>
                        <div className="booking-header-right">
                            <Row className="row-height">
                                <Col span={22} className="centralization">
                                    <span>Booking</span>
                                </Col>
                                <Col span={2} className="centralization">
                                    <Button style={{height: 60, width: 60}} shape="square" icon={<PoweroffOutlined
                                        style={{fontSize: 32, position: "relative", left: '13px', top: '3px'}}/>} />
                                </Col>
                            </Row>
                        </div>
                        <div className="booking-content">
                            <Steps current={0}>
                                <Step status={this.state.locationStep} title="Location" icon={<CompassOutlined
                                    style={{fontSize: 20, position: "relative", left: '13px', top: '7px'}}/>} />
                                <Step status={this.state.genderStep} title="Gender" icon={<WomanOutlined
                                    style={{fontSize: 20, position: "relative", left: '13px', top: '7px'}}/>} />
                                <Step status={this.state.languageStep} title="Language" icon={<CommentOutlined
                                    style={{fontSize: 20, position: "relative", left: '13px', top: '7px'}}/>} />
                                <Step status={this.state.timeStep} title="Time" icon={<FieldTimeOutlined
                                    style={{fontSize: 20, position: "relative", left: '13px', top: '7px'}}/>} />
                            </Steps>
                            <Divider style={{background: '#bbb'}}/>

                            {this.state.locationDisplay ?
                                <Location changeDisplayNext={(e) => {this.changeDisplayNext(e)}}/>
                                : null
                            }

                            {this.state.genderDisplay ?
                                <Gender changeDisplayBack={(e) => {this.changeDisplayBack(e)}}
                                changeDisplayNext={(e) => {this.changeDisplayNext(e)}}/>
                                : null }
                            {this.state.languageDisplay ?
                                <Language changeDisplayBack={(e) => {this.changeDisplayBack(e)}}
                                          changeDisplayNext={(e) => {this.changeDisplayNext(e)}}/>
                                : null
                            }
                            { this.state.timeDisplay ? <Time changeDisplayBack={(e) => {this.changeDisplayBack(e)}}
                                                             changeDisplayNext={(e) => {this.changeDisplayNext(e)}}/>
                                : null }

                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MainPage;