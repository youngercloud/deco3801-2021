import React, {Component} from 'react';
import "./static/banner.css"
import { Row, Col, Image } from 'antd';

export default class Banner extends Component {
    render() {
        return (
            <div className="banner-wrapper">
                <Row className="banner-text-wrapper" align="middle">
                    <Col span={3}/>
                    <Col span={9}>
                        <span className="banner-text-h1">Lhaucab</span>
                        <p className="banner-text-h2">Lhaucab</p>
                    </Col>
                    <Col span={9}>
                        <Image
                            preview={false}
                            width={200}
                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                        />
                    </Col>
                    <Col span={3}/>
                </Row>
            </div>
        );
    }
}
