import React, {Component} from 'react';
import './static/doctor.css'
import {Button, Card, Col, Row, Space} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
const { Meta } = Card;

class DoctorSelection extends Component {

    bookingGoBack(e) {
        this.props.changeDisplayBack(e)
    }

    bookingGoNext(e) {
        this.props.changeDisplayNext(e)
    }

    render() {
        return (
            <div className="doctor-selection">
                <Row className="doctor-selection-title">
                    <Col span={24}>
                        <span >Choose the doctor you prefer</span>
                    </Col>
                </Row>

                <Row className="doctor-selection-title" style={{marginTop: "50px"}}>
                    <Col span={8} className="doctor-selection-box" >
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        ><Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col span={8} className="doctor-selection-box">
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                    <Col span={8} className="doctor-selection-box">
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Europe Street beat" description="www.instagram.com" />
                        </Card>
                    </Col>
                </Row>

                <Row className="booking-process-button" style={{marginTop: "50px"}}>
                    <Space size="middle">
                        <Button onClick={() => {this.bookingGoBack(this.constructor.name)}} type="primary" shape="round"
                                icon={<LeftOutlined style={{position: "relative", top: "3px"}} />}>
                            Back
                        </Button>
                        <Button onClick={() => {this.bookingGoNext(this.constructor.name)}} type="primary" shape="round"
                                icon={<RightOutlined style={{position: "relative", top: "3px"}}/>}>
                            Next
                        </Button>
                    </Space>
                </Row>
            </div>
        );
    }
}

export default DoctorSelection;
