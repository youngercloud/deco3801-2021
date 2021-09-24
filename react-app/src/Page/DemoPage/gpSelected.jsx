import React, {Component} from "react";
import "./static/gpSelected.css";
import { Steps, Button, message } from 'antd';
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
const { Step } = Steps;



export default class gpSelected extends Component {
    render() {

        return (
            <div className="gp">
                <div className="steps">
                    <Steps progressDot current={1}>
                        <Step title={<p>Location</p>} />
                        <Step title={<p>Doctor</p>}  />
                        <Step title={<p>Time</p>}  />
                    </Steps>

                </div>
                <div>
                    <p>{this.props.name}</p>
                </div>
            </div>
        )}
}