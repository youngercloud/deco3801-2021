import {Component} from "react";
import "./static/bookLocation.css";
import { Input, Select, Space, Cascader } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import {Option} from "antd/es/mentions";


export default class Footer extends Component {
    render() {
        return (
            <div className="location">
                <Input.Group compact>
                    <Input size="large" style={{ width: '50%' }} placeholder="Type Clinic name or Post Code" />
                    <Select size="large" placeholder="Distance" style={{ width: 120 }}>
                        <Option value="1km">1km</Option>
                        <Option value="1km-3km">1km-3km</Option>
                    </Select>
                    <Select size="large" placeholder="Language" style={{ width: 120 }}>
                        <Option value="English">English</Option>
                        <Option value="Chinese">Chinese</Option>
                        <Option value="Japanese">Japanese</Option>
                    </Select>
                </Input.Group>
            </div>
        );
    }
}
