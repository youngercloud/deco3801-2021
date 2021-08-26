import React, {Component} from 'react';
import './static/time.css'
import {Button, Col, DatePicker, Row, Space, TimePicker} from "antd";
import moment from 'moment';
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

class Time extends Component {

    bookingGoBack(e) {
        this.props.changeDisplayBack(e)
    }

    bookingGoNext(e) {
        this.props.changeDisplayNext(e)
    }

    render() {
        return (
            <div className="time-selection">
                <Row className="time-selection-title">
                    <Col span={24}>
                        <span>When would you like to see your doctor?</span>
                    </Col>
                </Row>
                <Row className="time-selection-body">
                    <Col span={24} className="time-selection-form">
                        <Space size="large" direction="vertical">
                            <DatePicker/>
                            <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}/>
                        </Space>
                    </Col>
                </Row>
                <Row className="booking-process-button">
                    <Space size="middle">
                        <Button type="primary" onClick={() => {this.bookingGoBack(this.constructor.name)}}
                                shape="round" icon={<LeftOutlined style={{position: "relative",
                            top: "3px"}} />}>
                            Back
                        </Button>
                        <Button type="primary" onClick={() => {this.bookingGoNext(this.constructor.name)}}
                                shape="round" icon={<RightOutlined style={{position: "relative",
                            top: "3px"}} />}>
                            Next
                        </Button>
                    </Space>
                </Row>
            </div>
        );
    }
}

export default Time;