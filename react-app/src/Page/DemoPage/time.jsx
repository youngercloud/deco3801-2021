import React, {Component} from "react";
import {Button, Col, DatePicker, Row, Space, TimePicker} from "antd";
import moment from "moment";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import axios from "axios";

export default class doctorPage extends Component {
    state = {date: '',
            time:'',};

    timeShow;

    onChangeDate=(now)=> {
        let time = new Date(now._d)
        let d = new Date(time);
        let dateValue = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
        let api;

        api = "/api/date"

        axios.post(api, dateValue).then((response) => {
            if (response.data.creation === "true"){
                this.setState({date:dateValue})
                this.timeShow= <TimePicker defaultValue={moment('12:00', 'HH')}
                                           format={'HH'+":00"}
                                           onChange={(value)=>{
                                               const timeString = moment(value).format("HH");
                                               this.onChangeTime(timeString)
                                           }}
                />;
            }else if (response.data.creation === "false"){
                alert("sorry, this date is not available")
            }
        }).catch(function (error) {
            console.log(error);
        });


    }

    onChangeTime=(now)=> {
        let api;
        api = "/api/time"
        axios.post(api, now).then((response) => {
            if (response.data.creation === "true"){
                this.setState({time:now})

            }else if (response.data.creation === "false"){
                alert("sorry, this time is not available")
            }
        }).catch(function (error) {
            console.log(error);
        });

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
                <Row className="time-selection-title">
                    <Col span={24}>
                        <span>Choose a time</span>
                    </Col>

                    {this.state.time}
                </Row>
                <Row className="time-selection-body">
                    <Col span={24} className="time-selection-form">
                        <Space size="large" direction="vertical">
                            <DatePicker
                                format="YYYY-MM-DD "
                                disabledDate={disabledDate}
                                onChange={this.onChangeDate.bind(this)}
                            />

                            {this.timeShow}
                            {/*<TimePicker defaultValue={moment('12:00', 'HH')}*/}
                            {/*            format={'HH'+":00"}*/}
                            {/*            onChange={(value)=>{*/}
                            {/*                const timeString = moment(value).format("HH");*/}
                            {/*                this.onChangeTime(timeString)*/}
                            {/*            }}*/}

                            {/*/>*/}

                        </Space>
                    </Col>
                </Row>

            </div>
        )
    }
}