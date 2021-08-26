import React, {Component} from 'react';
import './static/location.css'
import {Button, Col, Row, Select, Space} from "antd";
import {Option} from "antd/es/mentions";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";


class Location extends Component {

    bookingGoNext(e) {
        this.props.changeDisplayNext(e)
    }

    render() {
        const GP_LIST =[{"name":"Mater Clinic"},{"name":"Tringa 7 Day Medical Practice"}, {"name": "ASCC Taringa"}];
        const info = GP_LIST.map((d) => <Option value={d.name} key={d.name}>{d.name}</Option>);

        return (
            <div className="location-selection">
                <Row className="location-selection-title">
                    <Col span={24}>
                        <span >Which GP that you would prefer?</span>
                    </Col>
                </Row>
                <Row className="location-selection-body">
                    <Col span={24}>
                        <Select
                            className="location-selection-search"
                            showSearch
                            style={{ width: 300, textAlign: "center"}}
                            placeholder="Select a GP"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }>
                            {info}
                        </Select>
                    </Col>
                </Row>
                <Row className="booking-process-button">
                    <Space size="middle">
                        <Button type="primary" onClick={() => {this.bookingGoNext(this.constructor.name)}} shape="round"
                                icon={<RightOutlined style={{position: "relative",
                            top: "3px"}}/>}>
                            Next
                        </Button>
                    </Space>
                </Row>
            </div>
        );
    }
}

export default Location;