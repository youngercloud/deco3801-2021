import React, {Component} from "react";
import "./static/myAccount.css";
import {Button, Card, Col, Image, Row} from 'antd';
import doctorImage from "../../Images/goodman.jpeg";

const {Meta} = Card;


export default class Footer extends Component {
    state = {
        a: null,
    }

    render() {
        return (
            <div className="account">

                    <Row gutter={[48, 48]} justify="center">
                        <h1>My information</h1>
                    </Row>
                    <div style={{width: '75%', marginLeft: '12.5%', marginBottom: '5%'}}>
                        <hr/>
                    </div>


                    <Row gutter={[48, 48]} justify="left">
                        <Col span={4}/>
                        <Col span={10}>
                            <div style={{textAlign:"left"}}>
                                <Row>
                                    <Col span={12}>
                                        <h2>Name: </h2>
                                        <h3>{sessionStorage.getItem("name")}</h3>
                                    </Col>
                                    <Col span={12}>
                                        <h2>Gender:  </h2>

                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <h2>Language: </h2>

                                    </Col>
                                    <Col span={12}>
                                        <h2>Date of Birth: </h2>

                                    </Col>

                                </Row>
                                <Row>
                                    <h2>Email Address: </h2>
                                </Row>
                                <Row>
                                    <h2>Phone Number: </h2>
                                </Row>


                            </div>
                        </Col>
                        <Col span={6}>
                            <Image src={doctorImage}/>
                        </Col>
                    </Row>

                    <div style={{width: '75%', marginLeft: '12.5%', marginTop: '10%', marginBottom:"10%",paddingBottom:"10%"}}>
                        <hr/>
                    </div>

            </div>

        );
    }
}
