import React, {Component} from 'react';
import "./static/Page5.css"
import { Typography } from 'antd';
import { Row, Col} from 'antd';
const { Title, Text } = Typography;


class Page5 extends Component {
    render() {
        return (
            <div>
                <Row align="middle" className="page5-text page5-display" >
                    <Col span={4}/>
                    <Col span={16}>
                        <Title className="page5-title" level={2}>Story</Title>
                        <Text>GagaGagaGagaGagaGagaGagaGagaGagaGagaGagaGagaGagaGagaGagaGagaGagaGagaGaga</Text>
                    </Col>
                    <Col span={4}/>
                </Row>
            </div>
        );
    }
}

export default Page5;