import React, {Component} from 'react';
import { Row, Col } from 'antd';
import "./static/footer.css"

export default class Footer extends Component {
    render() {
        return (
            <div className="page-footer">
                <Row className="page-footer-body" align="middle">
                    <Col span={3}/>
                    <Col span={6}>
                        <h2>Title</h2>

                        <div className="footer-col">
                            <div>
                                <a href="">
                                    SB1
                                </a>
                            </div>
                            <div>
                                <a href="">
                                    SB1
                                </a>
                            </div>
                            <div>
                                <a href="">
                                    SB1
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <h2>Title</h2>
                        <div className="footer-col">
                            <div>
                                <a href="">
                                    SB1
                                </a>
                            </div>
                            <div>
                                <a href="">
                                    SB1
                                </a>
                            </div>
                            <div>
                                <a href="">
                                    SB1
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <h2>Title</h2>
                        <div className="footer-col">
                            <div>
                                <a href="">
                                    SB1
                                </a>
                            </div>
                            <div>
                                <a href="">
                                    SB1
                                </a>
                            </div>
                            <div>
                                <a href="">
                                    SB1
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col span={3}/>
                </Row>
                <Row className="page-footer-bottom">
                    <Col span={24}>
                        &#169; 2021. Team 30036
                    </Col>
                </Row>
            </div>
        );
    }
}
