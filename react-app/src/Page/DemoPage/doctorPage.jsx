import React, {Component} from "react";
import "./static/doctorPage.css";
import {Card, Col, Row, Steps} from "antd";

const {Step} = Steps;


export default class doctorPage extends Component {
    constructor() {
        super();
        this.rowRef = React.createRef()
    }

    state = {select: null};

    changeColor = (e) => {
        this.rowRef.current.childNodes.forEach((re) => {
            re.firstChild.style.border = '1px solid rgba(0,0,0,0.3)';
        })
        e.currentTarget.style.border = 'green solid 2px';
    }

    doctorSelect = (e) => {
        this.setState({select: e})
    }

    gpSelected(info, e) {
        this.props.gpSelected(info, e, this.state.select)
    }

    doctorCheck(info, e) {
        if (this.state.select != null) {
            this.gpSelected(info, e);
        } else {
            alert("please select a doctor")
        }
    }

    componentDidMount() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            //window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,0);
        }
    }

    render() {
        const doctorInfo = this.props.name.DocInfos.map((doctor) => (
            <Col span={7}>
                <Card onClick={(e) => {
                    this.changeColor(e)
                    this.doctorSelect(doctor)
                }}>
                    <img alt="example" src={require('../../Images/gp1.png').default} style={{width: 177,}}/>
                    <h1>Name: {doctor.Doctor.LastName}</h1>
                    <h2>Gender: {doctor.Doctor.Gender}</h2>
                    <h2>Language: {doctor.Doctor.Language}</h2>
                    <h2>Introduction: {doctor.Doctor.Specialty}</h2>

                </Card>
            </Col>
        ));

        return (
            <div>

                <div className="doctorContent">
                    <div className="steps">
                        <Steps current={1}>
                            <Step title="Location"/>
                            <Step title="Doctor"/>
                            <Step title="Time"/>
                        </Steps>
                    </div>
                    <h1>Choose the doctor you prefer</h1>

                    <Row ref={this.rowRef} gutter={[48, 48]}>
                        {doctorInfo}
                        {/*<Col span={7}>*/}
                        {/*    <Card onClick={(e) => this.changeColor(e)} >*/}
                        {/*        <img  alt="example" src={require('../../Images/gp1.png').default} style={{width:177,}}/>*/}
                        {/*        <h1>name</h1>*/}
                        {/*        <h2>introduction</h2>*/}
                        {/*        <h2>introduction</h2>*/}
                        {/*    </Card>*/}
                        {/*</Col>*/}
                        {/*    <Col span={7}>*/}
                        {/*        <Card >*/}
                        {/*            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{width:177,}}/>*/}
                        {/*            <h1>AAAAA CLINIC</h1>*/}
                        {/*            <h2>distances:</h2>*/}
                        {/*            <h2>language:</h2>*/}
                        {/*            <Button>$65 - Consultation</Button>*/}
                        {/*        </Card>*/}
                        {/*    </Col>*/}
                        {/*    <Col span={7}>*/}
                        {/*        <Card >*/}
                        {/*            <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" style={{width:177,}}/>*/}
                        {/*            <h1>AAAAA CLINIC</h1>*/}
                        {/*            <h2>distances:</h2>*/}
                        {/*            <h2>language:</h2>*/}
                        {/*            <Button>$65 - Consultation</Button>*/}
                        {/*        </Card>*/}
                        {/*    </Col>*/}
                    </Row>
                </div>
                <div className="changePage">
                    <Row justify="center">
                        <Col span={6}/>
                        <Col span={5}>
                            <button className="backButton" onClick={() => {
                                this.gpSelected(this.props.name, "GpSelected")
                            }}><p>Back</p></button>
                        </Col>
                        <Col span={5}>
                            <button className="continueButton" onClick={() => {
                                this.doctorCheck(this.props.name, "time")
                            }}><p>Continue</p></button>
                        </Col>
                        <Col span={6}/>
                    </Row>
                </div>
            </div>
        )
    }
}