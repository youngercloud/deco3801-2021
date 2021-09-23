import React, {Component} from "react";
import "./static/myAccount.css";
import {Input, Select, Space, Cascader, Button, Col, Row} from 'antd';
import {LeftOutlined, SearchOutlined} from '@ant-design/icons';
import { Card } from 'antd';
import {createFromIconfontCN, SettingOutlined} from '@ant-design/icons';
import {Option} from "antd/es/mentions";

const { Meta } = Card;

export default class Footer extends Component {
    state={
        a: null,

    }
    render() {
        return (
            <div className="location">
                <div className="cards">
                    <Row gutter={[48, 48]} justify="center">
                        <Col span={20}>
                            <Card>
                                <Row gutter={[48, 48]} justify="center">
                                    <h1>My information</h1>
                                </Row>
                                <div style={{width:'75%',marginLeft:'7.5%', marginBottom:'10%'}}><hr/></div>


                                <Row gutter={[48, 48]} justify="left">
                                    <h2>distances:</h2>
                                    <h2>language:</h2>
                                    <Col>
                                        <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                                             style={{width:177,float:"right", marginRight:'10%'}}/>
                                        <Button style={{float:"right", marginRight:'10%'}}>
                                            Edit details
                                        </Button>
                                    </Col>
                                </Row>


                                <Row gutter={[48, 48]} justify="left">
                                    <h2>distances:</h2>
                                    <h2>language:</h2>
                                </Row>

                                <Row gutter={[48, 48]} justify="left">
                                    <h2>distances:</h2>
                                    <h2>language:</h2>
                                </Row>
                                <div style={{width:'75%',marginLeft:'7.5%', marginTop:'20%'}}><hr/></div>

                            </Card>
                        </Col>
                    </Row>
                </div>

            </div>

        );
    }
}
