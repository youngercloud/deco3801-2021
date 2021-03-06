import React, {Component} from "react";
import "./static/gpSelected.css";
import {Col, Image, Row, Steps} from 'antd';
import {createFromIconfontCN} from '@ant-design/icons';

const {Step} = Steps;
const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2823620_rrtlotzyts.js', // ε¨ iconfont.cn δΈηζ
});

export default class gpSelected extends Component {
    state = {
        strength: "none",
        time: "none",
    };

    // fix to top
    componentDidMount() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.scrollTo(0, 0);
        }
    }

    // display information or not
    onChangeStrength = () => {
        if (this.state.strength === "none") {
            this.setState({strength: "block"})
        } else {
            this.setState({strength: "none"})
        }
    }

    //display information or not
    onChangeTime = () => {
        if (this.state.time === "none") {
            this.setState({time: "block"})
        } else {
            this.setState({time: "none"})
        }
    }

    // send information to main page
    gpSelected(info, e) {
        this.props.gpSelected(info, e)
    }

    render() {
        return (
            <div className="gp">
                <div className="steps">
                    <Steps current={0}>
                        <Step title="Location"/>
                        <Step title="Doctor"/>
                        <Step title="Time"/>
                    </Steps>

                </div>
                <div className="gpIntroduction">
                    <div className="imagePart">
                        <Row>
                            <Col span={7}/>
                            <Col span={16}>
                                <img style={{marginTop: 20, width: "100%", height: "300px"}} alt="example"
                                     src={require('../../Images/' + this.props.name.Images.Path).default}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={9}/>
                            <Col span={4}>
                                <Image style={{height: "80px"}}
                                       src={require('../../Images/' + this.props.name.GpImages[0].Path).default}/>
                            </Col>
                            <Col span={4}>
                                <Image style={{height: "80px"}}
                                       src={require('../../Images/' + this.props.name.GpImages[1].Path).default}/>
                            </Col>
                            <Col span={4}>
                                <Image style={{height: "80px"}}
                                       src={require('../../Images/' + this.props.name.GpImages[2].Path).default}/>
                            </Col>
                        </Row>

                    </div>

                    <div className="gpContent">
                        <Row>
                            <Col span={15}>
                                <h2>{this.props.name.Gp.GpName}</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>{this.props.name.Distance} kilometer</h3>
                            </Col>
                            <p> &nbsp;||&nbsp;</p>
                                    {
                                        this.props.name.Language.map(item => (
                                                <h3 style={{fontWeight:"bold", color:"#354E57"}}  span={3}>{item} &nbsp;</h3>
                                            )
                                        )
                                    }

                        </Row>
                        <Row>
                            <Col span={15}>
                                <h3>About us</h3>
                                <p>{this.props.name.Gp.About}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={14}>
                                <h3>Strength</h3>
                                <div style={{display: this.state.strength}}>
                                    {this.props.name.GpStrength.map(item => (
                                        <p>{item} &nbsp;</p>
                                    ))}
                                </div>
                            </Col>
                            <Col>
                                {<MyIcon type="icon-jia" onClick={() => {
                                    this.onChangeStrength()
                                }} style={{fontSize: 15, marginTop: 5}}/>}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={15}>
                                <hr/>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={14}>
                                <h3>Opening Time</h3>
                                <div style={{display: this.state.time}}>
                                    <p>Monday: {this.props.name.Gp.Monday}</p>
                                    <p>Tuesday: {this.props.name.Gp.Tuesday}</p>
                                    <p>Thursday: {this.props.name.Gp.Thursday}</p>
                                    <p>Friday: {this.props.name.Gp.Friday}</p>
                                    <p>Saturday: {this.props.name.Gp.Saturday}</p>
                                    <p>Sunday: {this.props.name.Gp.Sunday}</p>
                                </div>

                            </Col>
                            <Col>
                                {<MyIcon onClick={() => {
                                    this.onChangeTime()
                                }} type="icon-jia" style={{fontSize: 15, marginTop: 5}}/>}
                            </Col>
                        </Row>
                    </div>
                    <div className="changePage">
                        <Row justify="center">
                            <Col span={6}/>
                            <Col span={5}>
                                <button className="backButton" onClick={() => {
                                    this.gpSelected(this.props.name, "backHome")
                                }}><p>Back</p></button>
                            </Col>
                            <Col span={5}>
                                <button className="continueButton" onClick={() => {
                                    this.gpSelected(this.props.name, "doctor")
                                }}><p>Continue</p></button>
                            </Col>
                            <Col span={6}/>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}