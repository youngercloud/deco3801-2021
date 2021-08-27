import React, {Component} from 'react';
import './static/doctor.css'
import Parser from 'html-react-parser';
import {Button, Card, Col, Row, Space} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Option} from "antd/es/mentions";
const { Meta } = Card;



class DoctorSelection extends Component {

    constructor() {
        super();
    }

    myFunction = (value) => {
        this.txt += ""
    }

    bookingGoBack(e) {
        this.props.changeDisplayBack(e)
    }

    bookingGoNext(e) {
        this.props.changeDisplayNext(e)
    }

    render() {

        let Doctor_LIST =[];
        this.props.doctorData.forEach(function (o) {Doctor_LIST.push(o)})
        const info = Doctor_LIST.map((d) =>
            <Col span={8} className="doctor-selection-box" >
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                ><Meta title={d.FirstName + " " + d.LastName} description="www.instagram.com" />
                </Card>
            </Col>
        );
        return (
            <div className="doctor-selection">
                <Row className="doctor-selection-title">
                    <Col span={24}>
                        <span >Choose the doctor you prefer</span>
                    </Col>
                </Row>

                <Row className="doctor-selection-title" style={{marginTop: "50px"}}>
                    {info}
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
