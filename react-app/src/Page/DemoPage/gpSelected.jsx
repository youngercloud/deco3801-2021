import React, {Component} from "react";
import "./static/gpSelected.css";
import {Steps, Button, message, Row, Col, Image} from 'antd';
import gp1 from "../../Images/gp1.png";
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
import logo from "./static/logo.png";
const { Step } = Steps;



export default class gpSelected extends Component {
    render() {

        return (
            <div className="gp">
                <div className="steps">
                    <Steps progressDot current={1}>
                        <Step title={<p>Location</p>} />
                        <Step title={<p>Doctor</p>}  />
                        <Step title={<p>Time</p>}  />
                    </Steps>

                </div>
                <div>
                    <div className="imagePart">
                        <Row>
                            <Col span={9}/>
                            <Col span={12}>
                                <img src={gp1}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={9}/>
                            <Col span={4}>
                                <Image src={gp1} />
                            </Col>
                            <Col span={4}>
                                <Image src={gp1} />
                            </Col>
                            <Col span={4}>
                                <Image src={gp1} />
                            </Col>
                        </Row>
                    </div>
                    <div className="gpContent">
                        <Row>
                            <Col span={12}>
                                <p>{this.props.name}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>1 Kilometers</h2>
                            </Col>
                            <Col>

                            </Col>
                        </Row>

                    </div>
                </div>
            </div>
        )}
}