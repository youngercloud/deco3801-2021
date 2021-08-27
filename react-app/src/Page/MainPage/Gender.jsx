import React, {Component} from 'react';
import './static/gender.css'
import {Row, Col, Space, Button} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

class Gender extends Component {

    state = {select: ''}

    constructor() {
        super();
        this.male = React.createRef();
        this.female = React.createRef();
        this.mtf = React.createRef();
        this.ftm = React.createRef();
        this.no_requirements = React.createRef();
    }

    changeColor = (e) => {
        this.male.current.style.border = 'none';
        this.female.current.style.border = 'none';
        this.mtf.current.style.border = 'none';
        this.ftm.current.style.border = 'none';
        this.no_requirements.current.style.border = 'none';
        e.target.style.border = 'green solid 2px';
    };

    bookingGoBack(e) {
        this.props.changeDisplayBack(e)
    }

    bookingGoNext(e, select) {
        this.props.changeDisplayNext(e, select)
    }

    render() {
        return (
            <div className="gender-selection">
                <Row className="gender-selection-title">
                    <Col span={24}>
                        <span>Which gender of the doctor would you prefer?</span>
                    </Col>
                </Row>

                <Row className="gender-selection-body">
                    <Col onClick={(e)=>{
                        this.changeColor(e)
                        this.setState({select: "male"})
                    }}
                         ref={this.male}
                         offset={4} span={6} className="gender-selection-box gender-selection-male">
                        Male
                    </Col>
                    <Col onClick={(e)=>{
                        this.changeColor(e)
                        this.setState({select: "female"})
                    }}
                         ref={this.female}
                         offset={4} span={6} className="gender-selection-box gender-selection-female">
                        Female
                    </Col>
                    <Col onClick={(e)=>{
                        this.changeColor(e, "mtf")
                        this.setState({select: "mtf"})
                    }}
                         ref={this.mtf}
                         offset={4} span={6} className="gender-selection-box gender-selection-MTF">
                        MTF
                    </Col>
                    <Col onClick={(e)=>{
                        this.changeColor(e)
                        this.setState({select: "ftm"})
                    }}
                         ref={this.ftm}
                         offset={4} span={6} className="gender-selection-box gender-selection-FTM">
                        FTM
                    </Col>
                    <Col onClick={(e)=>{
                        this.changeColor(e, "no_req")
                        this.setState({select: "no_req"})
                    }}
                        ref={this.no_requirements}
                        offset={4} span={16} className="gender-selection-box gender-selection-non-requirements">
                        No requirements on gender
                    </Col>
                </Row>
                <Row className="booking-process-button" style={{marginTop: "20px"}}>
                    <Space size="middle">
                        <Button type="primary" onClick={() => {this.bookingGoBack(this.constructor.name)}}
                                shape="round" icon={<LeftOutlined style={{position: "relative",
                            top: "3px"}} />}>
                            Back
                        </Button>
                        <Button type="primary" onClick={() => {this.bookingGoNext(this.constructor.name,
                            this.state.select)}}
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

export default Gender;