import React, {Component} from 'react';
import './static/doctor.css'
import {Button, Col, Row, Space} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import Card from "./Card";

class DoctorSelection extends Component {

    state = {select: ''}
    constructor() {
        super();
        this.rowRef = React.createRef()
    }

    changeColor = (e) => {
        console.log(this.rowRef.current.childNodes)
        this.rowRef.current.childNodes.forEach((re) => {
            re.firstChild.style.border = '1px solid rgba(0,0,0,0.3)';
        })
        e.currentTarget.style.border = 'green solid 2px';
    }

    bookingGoBack(e) {
        this.props.changeDisplayBack(e)
    }

    bookingGoNext(e, select) {
        this.props.changeDisplayNext(e, select)
    }

    render() {
        let Doctor_LIST =[];
        this.props.doctorData.forEach(function (o) {Doctor_LIST.push(o)})
        const info = Doctor_LIST.map((d) =>
            <Col span={8} className="doctor-selection-box">
                <Card onClick={(e) => {
                        this.changeColor(e)
                        this.setState({select: d.ID})
                    }} firstName={d.FirstName} lastName={d.LastName}>
                </Card>
            </Col>
        );
        return (
            <div className="doctor-selection">
                <Row className="doctor-selection-title">
                    <Col span={24}>
                        <span>Choose the doctor you prefer</span>
                    </Col>
                </Row>

                <Row className="doctor-selection-title" style={{marginTop: "50px"}} ref={this.rowRef}>
                    {info}
                </Row>

                <Row className="booking-process-button" style={{marginTop: "50px"}}>
                    <Space size="middle">
                        <Button onClick={() => {this.bookingGoBack(this.constructor.name)}} type="primary" shape="round"
                                icon={<LeftOutlined style={{position: "relative", top: "3px"}} />}>
                            Back
                        </Button>
                        <Button onClick={() => {this.bookingGoNext(this.constructor.name, this.state.select)}} type="primary" shape="round"
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
