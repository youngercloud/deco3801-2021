import React, {Component} from "react";
import "./static/bookLocation.css";
import {Input, Select, Space, Cascader, Button, Col, Row} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import {createFromIconfontCN, SettingOutlined} from '@ant-design/icons';
import {Option} from "antd/es/mentions";



const distanceOptions=[
    { value: '1km', label: '1km' },
    { value: '1km-3km', label: '1km-3km' },
];

const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
];

const { Meta } = Card;

export default class Footer extends Component {
    state={
        inputGP: null,
        distanceSelect:null,
        languageSelect:null,

    }
    handleGetInputValue = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        })
    };

    handleDistanceValue = distanceSelect => {
        this.setState({
            distanceSelect : distanceSelect,
        })
    };

    handleLanguageValue = languageSelect => {
        this.setState({
            languageSelect : languageSelect,
        })
    };

    render() {
        return (
            <div className="location">
                <div className="inputData">
                    <Input.Group compact>
                        <Input size="large" style={{ width: '50%' }} placeholder="Type Clinic name or Post Code" name="inputGP"
                               onChange={this.handleGetInputValue} />
                        <Select size="large" placeholder="Distance" style={{ width: 120 }} value={this.state.distanceSelect}
                                onChange={this.handleDistanceValue} options={distanceOptions}>
                            {/*<Option value="1km">1km</Option>*/}
                            {/*<Option value="1km-3km">1km-3km</Option>*/}
                        </Select>

                        <Select size="large" placeholder="Language" style={{ width: 120 }} value={this.state.languageSelect}
                                onChange={this.handleLanguageValue} options={languageOptions}>
                            {/*<Option value="English">English</Option>*/}
                            {/*<Option value="Chinese">Chinese</Option>*/}
                            {/*<Option value="Japanese">Japanese</Option>*/}
                        </Select>
                        <Button type="primary" icon={<SearchOutlined style={{fontSize:20,paddingLeft:8}}/> }size="large" />
                    </Input.Group>
                </div>

                {/*<p>Input: {this.state.inputGP}</p>*/}
                {/*<p>Select1: {this.state.distanceSelect}</p>*/}
                {/*<p>Select2: {this.state.languageSelect}</p>*/}
                <div className="cards">
                    <Row gutter={[48, 48]} justify="center">
                        <Col span={9}>
                            <Card >
                                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{width:177,float:"left"}}/>
                                <h1>AAAAA CLINIC</h1>
                                <h2>distances:</h2>
                                <h2>language:</h2>
                                <Button>$65 - Consultation</Button>
                            </Card>
                        </Col>
                        <Col span={9}>
                            <Card >
                                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{width:177,float:"left"}}/>
                                <h1>AAAAA CLINIC</h1>
                                <h2>distances:</h2>
                                <h2>language:</h2>
                                <Button>$65 - Consultation</Button>
                            </Card>
                        </Col>
                    </Row>
                    <Row gutter={[48, 48]} justify="center">
                        <Col span={9}>
                            <Card >
                                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{width:177,float:"left"}}/>
                                <h1>AAAAA CLINIC</h1>
                                <h2>distances:</h2>
                                <h2>language:</h2>
                                <Button>$65 - Consultation</Button>
                            </Card>
                        </Col>
                        <Col span={9}>
                            <Card >
                                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{width:177,float:"left"}}/>
                                <h1>AAAAA CLINIC</h1>
                                <h2>distances:</h2>
                                <h2>language:</h2>
                                <Button>$65 - Consultation</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>

            </div>

        );
    }
}
