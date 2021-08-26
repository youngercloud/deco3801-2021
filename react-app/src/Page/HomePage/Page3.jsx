import React, {Component} from 'react';
import { Row, Col } from 'antd';
import { Carousel } from 'antd';
import { Typography } from 'antd';
import "./static/Page3.css"

const { Title, Text } = Typography;
const contentStyle = {
    height: '160px',
    color: '#000',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#fff',
    dots: true,
};

class Page extends Component {
    render() {
        return (
            <div>
                <Row align="middle" className="page-text page-display">
                    <Col span={3}/>
                    <Col span={18}>
                        <Title level={2} className="page-title">Partners</Title>
                        <Carousel>
                            <div>
                                <h3 style={contentStyle}>1</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>2</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>3</h3>
                            </div>
                            <div>
                                <h3 style={contentStyle}>4</h3>
                            </div>
                        </Carousel>
                    </Col>
                    <Col span={3}/>
                </Row>
            </div>
        );
    }
}

export default Page;
