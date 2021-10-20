import React, {Component} from "react";
import "./static/gpSelected.css";
import {Col, Image, Row, Steps} from 'antd';
import gp1 from "../../Images/gp1.png";
import {createFromIconfontCN} from '@ant-design/icons';

const {Step} = Steps;

const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2823620_rrtlotzyts.js', // 在 iconfont.cn 上生成
});


export default class gpSelected extends Component {
    state = {
        strength: "none",
        time: "none",
    };

    componentDidMount() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            //window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,0);
        }
    }

    onChangeStrength = () => {
        if (this.state.strength === "none") {
            this.setState({strength: "block"})
        } else {
            this.setState({strength: "none"})
        }
    }

    onChangeTime = () => {
        if (this.state.time === "none") {
            this.setState({time: "block"})
        } else {
            this.setState({time: "none"})
        }
    }

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
                            <Col span={9}/>
                            <Col span={12}>
                                <img style={{marginTop: 20}} alt="example"
                                     src={require('../../Images/' + this.props.name.Images.Path).default}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={9}/>
                            <Col span={4}>
                                <Image src={gp1}/>
                            </Col>
                            <Col span={4}>
                                <Image src={gp1}/>
                            </Col>
                            <Col span={4}>
                                <Image src={gp1}/>
                            </Col>
                        </Row>

                    </div>

                    <div className="gpContent">
                        <Row>
                            <Col span={15}>
                                <h2>{this.props.name.Gp.GpName}</h2>
                                {/*<h2>{this.props.name}</h2>*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h3>{this.props.name.Distance} kilometer</h3>
                            </Col>
                            <Col><p>||</p></Col>
                            <Col>
                                <h3>{this.props.name.Language}</h3>
                            </Col>
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
                                    <p>{this.props.name.Gp.Strengths}</p>
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