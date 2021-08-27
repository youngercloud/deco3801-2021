import React, {Component} from 'react';
import './static/language.css'
import {Button, Col, Row, Select, Space} from "antd";
import {Option} from "antd/es/mentions";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";


class Language extends Component {

    bookingGoBack(e) {
        this.props.changeDisplayBack(e)
    }

    bookingGoNext(e, select) {
        this.props.changeDisplayNext(e, select)
    }

    state = {select: ''}

    render() {
        const GP_LIST =["Česky", "Dansk", "Deutsch", "English", "Español", "Ελληνική", "Français", "Italiano",
            "Nederlands", "Русский", "简体中文", "繁體中文", "한국어", "日本語"];
        const info = GP_LIST.map((d) => <Option value={d} key={d}>{d}</Option>);
        return (
            <div className="language-selection">
                <Row className="language-selection-title">
                    <Col span={24}>
                        <span >Which Language you expect your doctor to speak?</span>
                    </Col>
                </Row>

                <Row className="language-selection-body">
                    <Col span={24}>
                        <Select
                            className="language-selection-search"
                            showSearch
                            style={{ width: 450, textAlign: "center"}}
                            placeholder="Select a Language"
                            optionFilterProp="children"
                            onChange={(v) => {
                                this.setState({select: v})
                            }}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {info}
                        </Select>
                    </Col>
                </Row>

                <Row className="booking-process-button">
                    <Space size="middle">
                        <Button onClick={() => {this.bookingGoBack(this.constructor.name)}} type="primary" shape="round"
                                icon={<LeftOutlined style={{position: "relative", top: "3px"}} />}>
                            Back
                        </Button>
                        <Button onClick={() => {this.bookingGoNext(this.constructor.name, this.state.select)}} type="primary" shape="round"
                                icon={<RightOutlined style={{position: "relative", top: "3px"}}/>}>
                            Next
                        </Button>
                    </Space>
                </Row>
            </div>
        );
    }
}

export default Language;
