import React, {Component} from 'react';
import {Row, Col, Button, Space, Input, Tooltip, Divider, notification} from 'antd';
import "./static/style.css"
import {
    CommentOutlined,
    CompassOutlined,
    FieldTimeOutlined,
    PoweroffOutlined,
    SearchOutlined, UserOutlined,
    WomanOutlined
} from "@ant-design/icons";
import { Steps } from 'antd';
import Gender from "./Gender";
import Location from "./Location";
import Language from "./Language";
import Time from "./Time";
import DoctorSelection from "./DoctorSelection";
const { Step } = Steps;


let userOptions = {locationSelect:"", genderSelection:"", languageSelection:""};

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            languageDisplay: false,
            genderDisplay: false,
            locationDisplay: true,
            timeDisplay: false,
            doctorDisplay: false,
            languageStep: 'wait',
            genderStep: 'wait',
            locationStep: 'process',
            timeStep: 'wait',
            doctorStep: 'wait',
        }
    }



    changeDisplayBack(name){
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
                doctorDisplay: true,
                timeStep: 'wait',
                doctorStep: 'process',
            })
        } else if (name === 'DoctorSelection') {
            this.setState({
                doctorDisplay: false,
                languageDisplay: true,
                doctorStep: 'wait',
                languageStep: 'process',
            })
        }
    }

    openErrorLocation = () => {
        notification.open({
            message: 'Whoops! We get an error',
            description:
                'Please choose the GP you are looking for in the selection bar.',
        });
    };

    openErrorGender = () => {
        notification.open({
            message: 'Whoops! We get an error',
            description:
                'Please choose the gender of the doctor that you prefer.' +
                'If you are not sure about it yet, you may choose no requirements on gender.',
        });
    };

    openErrorLanguage = () => {
        notification.open({
            message: 'Whoops! We get an error',
            description:
                'Please choose which language that your doctor speak.',
        });
    }


    changeDisplayNext(name, options){
        if (name === 'Location') {
            if (options === '') {
                this.openErrorLocation()
                return
            }
            userOptions.locationSelect = options;
            this.setState({
                locationDisplay: false,
                genderDisplay: true,
                locationStep: 'finish',
                genderStep: 'process',
            })
        } else if (name === 'Gender') {
            if (options === '') {
                this.openErrorGender()
                return
            }
            userOptions.GenderSelection = options;
            this.setState({
                genderDisplay: false,
                languageDisplay: true,
                genderStep: 'finish',
                languageStep: 'process',
            })
        } else if (name === 'Language') {
            if (options === '') {
                this.openErrorLanguage()
                return
            }
            userOptions.languageSelection = options;
            this.setState({
                languageDisplay: false,
                doctorDisplay: true,
                languageStep: 'finish',
                doctorStep: 'process',
            })
        } else if (name === 'DoctorSelection') {
            this.setState({
                doctorDisplay: false,
                timeDisplay: true,
                doctorStep: 'finish',
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
                                <Step status={this.state.doctorStep} title="Doctor" icon={<UserOutlined
                                    style={{fontSize: 20, position: "relative", left: '13px', top: '7px'}}/>} />
                                <Step status={this.state.timeStep} title="Time" icon={<FieldTimeOutlined
                                    style={{fontSize: 20, position: "relative", left: '13px', top: '7px'}}/>} />
                            </Steps>
                            <Divider style={{background: '#bbb'}}/>

                            {this.state.locationDisplay ?
                                <Location changeDisplayNext={(e, l) => {this.changeDisplayNext(e, l)}}/>
                                : null
                            }

                            {this.state.genderDisplay ?
                                <Gender changeDisplayBack={(e) => {this.changeDisplayBack(e)}}
                                changeDisplayNext={(e, l) => {this.changeDisplayNext(e, l)}}/>
                                : null }

                                {this.state.languageDisplay ?
                                <Language changeDisplayBack={(e) => {this.changeDisplayBack(e)}}
                                          changeDisplayNext={(e, l) => {this.changeDisplayNext(e, l)}}/>
                                : null}
                            {this.state.doctorDisplay ? <DoctorSelection changeDisplayBack={(e) => {this.changeDisplayBack(e)}}
                                                                         changeDisplayNext={(e) => {this.changeDisplayNext(e)}}/>
                                : null}
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