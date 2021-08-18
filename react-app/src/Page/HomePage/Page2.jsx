import React, {Component} from 'react';
import "./static/Page2.css"
import { Row, Col, Button, Typography} from 'antd';

const { Title, Text } = Typography;
class Page2 extends Component {
    render() {
        return (
            <div className="page2-bg">
                <Row align="middle" className="page2-display">
                    <Col span={8}/>
                    <Col span={8}>
                        <div className="card">
                            <Title level={1}>Title</Title>
                            <Title level={4}>122121</Title>
                            <Button ghost >sc</Button>
                        </div>
                    </Col>
                    <Col span={8}/>
                </Row>
            </div>
        );
    }
}

export default Page2;