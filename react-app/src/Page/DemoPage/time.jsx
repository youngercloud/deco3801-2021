import React, {Component} from "react";
import {Button, Col, DatePicker, Row, Space, Steps, TimePicker} from "antd";
import moment from "moment";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import axios from "axios";
const { Step } = Steps;
export default class doctorPage extends Component {
    state = {
            date: "",
            GpName:this.props.name.Gp.GpName,
            lastName:this.props.doctor.Doctor.LastName,
            firstName:this.props.doctor.Doctor.FirstName,
            time: "",
            demo:"none",
    };

    timeShow;

    onChangeDate=(now)=> {
        let time = new Date(now._d)
        let d = new Date(time);
        let dateValue = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
        this.state.date = dateValue
        let api;
        console.log(this.state)
        api = "/api/date"

        axios.post(api, this.state).then((response) => {
            if (response.data.validation === true){
                console.log("true")
                this.setState({demo:"block"})
                // this.timeShow= <TimePicker defaultValue={moment('12:00', 'HH')}
                //                            format={'HH'+":00"}
                //                            onChange={(value)=>{
                //                                const timeString = moment(value).format("HH");
                //                                this.onChangeTime(timeString)
                //                            }}
                // />;
            }else if (response.data.validation === false){
                this.setState({date:""})
                alert("sorry, this date is not available")
            }
        }).catch(function (error) {
            console.log(error);
        });

    }

    onChangeTime=(now)=> {

        this.state.time = now+":00";
        let api;
        api = "/api/time"
        axios.post(api, this.state).then((response) => {
            if (response.data.validation === true){


            }else if (response.data.validation === false){
                this.setState({time:""})
                alert("sorry, this time is not available")
            }
        }).catch(function (error) {
            console.log(error);
        });

    }

    checkSelect(info,e,doctor,date,time){
        if (date!="" && time != ""){
            this.gpSelected(info,e,doctor,date,time);
        }else{
            alert("please complete form")
        }
    }

    gpSelected(info,e,doctor,date,time){
        this.props.gpSelected(info,e,doctor,date,time)
    }

    render() {
        function range(start, end) {
            const result = [];
            for (let i = start; i < end; i++) {
                result.push(i);
            }
            return result;
        }

        const { RangePicker } = DatePicker;

        function disabledDate(current) {
            // Can not select days before today and today
            return current && current < moment().endOf('day');
        }

        return (
            <div className="time-selection">
                <div className="steps">
                    <Steps current={2}>
                        <Step title="Location"  />
                        <Step title="Doctor"  />
                        <Step title="Time"  />
                    </Steps>
                </div>
                <Row className="time-selection-title">
                    <Col span={24}>
                        <span>Choose a time</span>
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

                            <div style={{display:this.state.demo}}>
                                <TimePicker format={'HH'+":00"}
                                            onChange={(value)=>{
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
                            <button className="backButton"  onClick={() => {this.gpSelected(this.props.name,"doctor",this.props.doctor)}}><p>Back</p></button>
                        </Col>
                        <Col span={5}>
                            <button className="continueButton" onClick={() => {this.checkSelect(this.props.name,"finish",this.props.doctor,this.state.date,this.state.time)}}><p>Continue</p></button>
                        </Col>
                        <Col span={6}/>
                    </Row>
                </div>

            </div>
        )
    }
}