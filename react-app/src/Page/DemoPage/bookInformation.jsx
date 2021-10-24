import React, {Component} from "react";
import {Col, Image, Row, Steps} from "antd";
import doctorImage from "../../Images/goodman.jpeg"
import './static/information.css';
const { Step } = Steps;
export default class doctorPage extends Component {
    gpSelected(info,e){
        this.props.gpSelected(info,e)
    }

    componentDidMount() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            //window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,0);
        }
    }

    render() {
        const gp = this.props.name;
        const doctor = this.props.doctor;
        const date = this.props.date;
        const time = this.props.time;

        return (
        <div style={{height:850}} >
            <div className="steps">
                <Steps current={3}>
                    <Step title="Location"  />
                    <Step title="Doctor"  />
                    <Step title="Time"  />
                </Steps>
                <br/>
                <h1>
                    Booking information
                </h1>
            </div>
            <hr/>
            <div className="bookingInformation">
                <Row>
                    <Col span={4}/>
                    <Col span={10}>
                        <div style={{textAlign:"left"}}>
                            <Row>
                                <Col span={12}>
                                    <h1>gp name: </h1>
                                    <p>{gp.Gp.GpName}</p>
                                </Col>
                                <Col span={12}>
                                    <h1>doctor name:  </h1>
                                    <p>{doctor.Doctor.LastName} {doctor.Doctor.FirstName}</p>
                                </Col>

                            </Row>
                            <Row>
                                <Col span={12}>
                                    <h1>Language: </h1>
                                    <p>{doctor.Doctor.Language}</p>
                                </Col>
                                <Col span={12}>
                                    <h1>gender name: </h1>
                                    <p>{doctor.Doctor.Gender}</p>
                                </Col>

                            </Row>
                            <h1>Email: </h1>
                            <p>{doctor.Doctor.Email}</p>
                            <h1>Booking Time: </h1>
                            <p>{time} - {date}</p>
                            <h1>gp address: </h1>
                            <p>{gp.Gp.Address}</p>
                        </div>
                    </Col>
                    <Col span={6}>

                        <Image src={require('../../Images/' + doctor.Image[0].Path).default}/>

                    </Col>
                </Row>
            </div>

            <hr/>
            <div className="changePage" >
                <button style={{width:"13%"}} className="continueButton" onClick={() => {this.gpSelected(this.props.name,"backHome")}}><p>Finish</p></button>
            </div>

        </div>

    )}
}
