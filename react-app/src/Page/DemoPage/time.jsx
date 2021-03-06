import React, {Component} from "react";
import {Col, DatePicker, Row, Space, Steps, TimePicker} from "antd";
import moment from "moment";
import axios from "axios";

const {Step} = Steps;
export default class doctorPage extends Component {
    state = {
        GpName: this.props.name.Gp.GpName,
        lastName: this.props.doctor.Doctor.LastName,
        firstName: this.props.doctor.Doctor.FirstName,
        demo: "none",
        UserName: sessionStorage.getItem("name"),
        UserPassword: sessionStorage.getItem("password"),
        GpAddr: this.props.name.Gp.Address,
        DocLang: this.props.doctor.Doctor.Language,
        DocGender: this.props.doctor.Doctor.Gender,
        DocEmail: this.props.doctor.Doctor.Email,
        date: "",
        time: "",
    };

    //fix to top
    componentDidMount() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            window.scrollTo(0, 0);
        }
    }

    //record time and date
    onChangeDate = (now) => {
        if (now != null) {
            let time = new Date(now._d)
            let d = new Date(time);
            let dateValue = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
            this.state.date = dateValue
            let api;
            api = "/api/date"
            axios.post(api, this.state).then((response) => {
                if (response.data.validation === true) {
                    this.setState({demo: "block"})
                } else if (response.data.validation === false) {
                    this.setState({date: ""})
                    this.setState({demo: "none"})
                    this.state.demo = "none";
                    alert("sorry, this date is not available")
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    //record time and date
    onChangeTime = (now) => {
        this.state.time = now + ":00";
        let api;
        api = "/api/time"
        axios.post(api, this.state).then((response) => {
            if (response.data.validation === true) {
                this.setState({time: now + ":00"})
            } else if (response.data.validation === false) {
                this.setState({time: ""})
                alert("sorry, this time is not available")
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    //judge whether data and time are selected
    checkSelect(info, e, doctor, date, time) {
        if (date !== "" && time !== "") {
            let api;
            api = "/api/booking"
            axios.post(api, this.state).then((response) => {
                if (response.data.validation === true) {
                    this.gpSelected(info, e, doctor, date, time);
                } else if (response.data.validation === false) {
                    alert("sorry, some errors happen")
                }
            }).catch(function (error) {
                console.log(error);
            });

        } else {
            alert("please complete form")
        }
    }

    gpSelected(info, e, doctor, date, time) {
        this.props.gpSelected(info, e, doctor, date, time)
    }

    render() {
        function range(start, end) {
            const result = [];
            for (let i = start; i < end; i++) {
                result.push(i);
            }
            return result;
        }

        const {RangePicker} = DatePicker;

        // Can not select days before today and today
        function disabledDate(current) {
            return current && current < moment().endOf('day');
        }

        return (
            <div className="time-selection" style={{height: "900px"}}>
                <div className="steps">
                    <Steps current={2}>
                        <Step title="Location"/>
                        <Step title="Doctor"/>
                        <Step title="Time"/>
                    </Steps>
                </div>
                <Row className="time-selection-title">
                    <Col span={24}>
                        <div style={{textAlign: "center"}}>
                            <h3 style={{fontSize: "35px", color: "#354E57"}}>Choose a time</h3>
                        </div>

                    </Col>
                </Row>
                <Row className="time-selection-body">
                    <Col span={24} className="time-selection-form">
                        <Space size="large" direction="vertical">
                            <DatePicker
                                format="YYYY/MM/DD "
                                disabledDate={disabledDate}
                                onChange={this.onChangeDate.bind(this)}
                            />
                            <div style={{display: this.state.demo}}>
                                <TimePicker format={'HH' + ":00"}
                                            onChange={(value) => {
                                                const timeString = moment(value).format("HH");
                                                this.onChangeTime(timeString)
                                            }}
                                />
                            </div>
                        </Space>
                    </Col>
                </Row>
                <div className="changePage">
                    <Row justify="center">
                        <Col span={6}/>
                        <Col span={5}>
                            <button className="backButton" onClick={() => {
                                this.gpSelected(this.props.name, "doctor", this.props.doctor)
                            }}><p>Back</p></button>
                        </Col>
                        <Col span={5}>
                            <button className="continueButton" onClick={() => {
                                this.checkSelect(this.props.name, "finish", this.props.doctor, this.state.date, this.state.time)
                            }}><p>Continue</p></button>
                        </Col>
                        <Col span={6}/>
                    </Row>
                </div>
            </div>
        )
    }
}