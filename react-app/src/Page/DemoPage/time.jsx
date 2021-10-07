import React, {Component} from "react";
import {Button, Col, DatePicker, Row, Space, Steps, TimePicker} from "antd";
import moment from "moment";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import axios from "axios";
const { Step } = Steps;
export default class doctorPage extends Component {
    state = {date: null,
            time:null,
            clinic:this.props.name.Gp.GpName,
            lastName:this.props.doctor.Doctor.LastName,
            firstName:this.props.doctor.Doctor.FirstName,
    };

    timeShow;

    onChangeDate=(now)=> {
        let time = new Date(now._d)
        let d = new Date(time);
        let dateValue = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
        this.setState({date:dateValue})
        let api;

        api = "/api/date"

        axios.post(api, this.state).then((response) => {
            if (response.data.creation === "true"){

                this.timeShow= <TimePicker defaultValue={moment('12:00', 'HH')}
                                           format={'HH'+":00"}
                                           onChange={(value)=>{
                                               const timeString = moment(value).format("HH");
                                               this.onChangeTime(timeString)
                                           }}
                />;
            }else if (response.data.creation === "false"){
                this.setState({date:null})
                alert("sorry, this date is not available")
            }
        }).catch(function (error) {
            console.log(error);
        });

    }

    onChangeTime=(now)=> {
        this.setState({time:now+":00"})
        let api;
        api = "/api/time"
        axios.post(api, this.state).then((response) => {
            if (response.data.creation === "true"){


            }else if (response.data.creation === "false"){
                this.setState({time:null})
                alert("sorry, this time is not available")
            }
        }).catch(function (error) {
            console.log(error);
        });

    }

    checkSelect(info,e,doctor,date,time){
        if (date!=null && time != null){
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
                    {/*{console.log(this.state)}*/}
                </Row>
                <Row className="time-selection-body">
                    <Col span={24} className="time-selection-form">
                        <Space size="large" direction="vertical">
                            <DatePicker
                                format="YYYY/MM/DD "
                                disabledDate={disabledDate}
                                onChange={this.onChangeDate.bind(this)}
                            />

                            {this.timeShow}
                            {/*<TimePicker format={'HH'+":00"}*/}
                            {/*            onChange={(value)=>{*/}
                            {/*                const timeString = moment(value).format("HH");*/}
                            {/*                this.onChangeTime(timeString)*/}
                            {/*            }}*/}

                            {/*/>*/}

                        </Space>
                    </Col>
                </Row>
                <div >
                    <button onClick={() => {this.gpSelected(this.props.name,"doctor",this.props.doctor)}}><p>Back</p></button>

                    <button onClick={() => {this.checkSelect(this.props.name,"finish",this.props.doctor,this.state.date,this.state.time)}}><p>Continue</p></button>
                    {/*<button onClick={() => {this.gpSelected(this.props.name,"finish",this.props.doctor,this.state.date,this.state.time)}}><p>Continue</p></button>*/}
                </div>
            </div>
        )
    }
}