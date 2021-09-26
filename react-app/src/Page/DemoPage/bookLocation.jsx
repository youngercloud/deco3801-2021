
import React, {Component} from "react";
import "./static/bookLocation.css";
import {Input, Select, Space, Cascader, Button, Col, Row} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Card } from 'antd';

import {createFromIconfontCN, SettingOutlined} from '@ant-design/icons';
import {Option} from "antd/es/mentions";
import axios from "axios";

const distanceOptions=[
    { value: '0,1', label: '1km' },
    { value: '1,3', label: '1km-3km' },
];

const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Japanese', label: 'Japanese' },
];

const { Meta } = Card;


export default class bookLocation extends Component {
    info;
    state={
        input: '',
        distanceMin:'0',
        distanceMax:'9999',
        language:'',
        distanceSelect: undefined
    }
    handleGetInputValue = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        })
    };

    handleDistanceValue = distanceSelect => {
        this.setState({
            distanceMin : distanceSelect.replace(",","")[0],
            distanceMax : distanceSelect.replace(",","")[1],
        })

    };

    handleLanguageValue = languageSelect => {
        this.setState({
            language : languageSelect,
        })
    };

    gpSelected(info){
        this.props.gpSelected(info)
    }

    submit = (e) => {
        console.log(e)
        let api;
        api = "/api/booking/searchGp"
        axios.post(api, e).then((response) => {
            console.log(response.data)
            const json = response;
            const arr = [];
            Object.keys(json).forEach(function(key) {
                arr.push(json[key]);
            });
            this.info = arr.map((d) =>
                <Col span={9} >
                    <Card>
                        <img alt="example" src={d.image} style={{width:177,float:"left"}}/>
                        <h1>{d.name}</h1>
                        <h2>{d.distance}</h2>
                        <h2>{d.language}</h2>
                        <Button  onClick={() => {this.gpSelected(d.name)}}>$65 - Consultation</Button>
                    </Card>
                </Col>
            );
        }).catch(function (error) {
            console.log(error);
        });
    };

    render() {
        return (
            <div className="location">
                <div className="inputData">
                    <Input.Group compact>
                        <Input size="large" style={{ width: '50%' }} placeholder="Type Clinic name or Post Code" name="input"
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
                        <Button type="primary" icon={<SearchOutlined style={{fontSize:20,paddingLeft:8}}/>}size="large" onClick={()=>this.submit(this.state)}/>
                    </Input.Group>
                </div>

                {/*<p>Input: {this.state.inputGP}</p>*/}
                {/*<p>Select1: {this.state.distanceSelect}</p>*/}
                {/*<p>Select2: {this.state.languageSelect}</p>*/}
                <div className="cards">
                    <Row gutter={[48, 48]} justify="center">
                        {this.info}
                        <Col span={9}>
                            <Card >
                                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{width:177,float:"left"}}/>
                                <h1>AAAAA CLINIC</h1>
                                <h2>distances:</h2>
                                <h2>language:</h2>
                                <Button  onClick={() => {this.gpSelected("AAAAA CLINIC")}}>$65 - Consultation</Button>
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
                        {this.info}
                    </Row>
                    {/*<Row gutter={[48, 48]} justify="center">*/}
                    {/*    <Col span={9}>*/}
                    {/*        <Card >*/}
                    {/*            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{width:177,float:"left"}}/>*/}
                    {/*            <h1>AAAAA CLINIC</h1>*/}
                    {/*            <h2>distances:</h2>*/}
                    {/*            <h2>language:</h2>*/}
                    {/*            <Button>$65 - Consultation</Button>*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}
                    {/*    <Col span={9}>*/}
                    {/*        <Card >*/}
                    {/*            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{width:177,float:"left"}}/>*/}
                    {/*            <h1>AAAAA CLINIC</h1>*/}
                    {/*            <h2>distances:</h2>*/}
                    {/*            <h2>language:</h2>*/}
                    {/*            <Button>$65 - Consultation</Button>*/}
                    {/*        </Card>*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                </div>
            </div>

        );
    }
}
