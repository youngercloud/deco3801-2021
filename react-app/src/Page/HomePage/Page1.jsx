import React, {Component} from 'react';
import { Row, Col } from 'antd';
import { Typography } from 'antd';
import "./static/Page1.css"
import {QuestionCircleFilled} from "@ant-design/icons";

const { Title, Text } = Typography;

class Page1 extends Component {
    render() {
        return (
            <div>
                <Row align="middle" className="page-text page-display">
                    <Col span={3}/>
                    <Col span={4}>
                        <Title level={2}>
                            Text1 <QuestionCircleFilled />
                        </Title>
                        <Title level={3}>
                            Text1Text1Text1Text1Text1Text1
                        </Title>
                        <Text>
                            Text1Text1Text1Text1Text1Text1Text1Text1Text1Text1
                        </Text>
                    </Col>
                    <Col span={3}/>
                    <Col span={4}>
                        <Title level={2}>
                            Text1 <QuestionCircleFilled />
                        </Title>
                        <Title level={3}>
                            Text1Text1Text1Text1Text1Text1
                        </Title>
                        <Text>
                            Text1Text1Text1Text1Text1Text1Text1Text1Text1Text1
                        </Text>
                    </Col>
                    <Col span={3}/>
                    <Col span={4}>
                        <Title level={2}>
                            Text1 <QuestionCircleFilled />
                        </Title>
                        <Title level={3}>
                            Text1Text1Text1Text1Text1Text1
                        </Title>
                        <Text>
                            Text1Text1Text1Text1Text1Text1Text1Text1Text1Text1
                        </Text>
                    </Col>
                    <Col span={3}/>
                </Row>
            </div>
        );
    }
}

export default Page1;
