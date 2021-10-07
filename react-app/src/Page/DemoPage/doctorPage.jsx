import React, {Component} from "react";
import "./static/doctorPage.css";
import {Button, Card, Col, Row, Steps} from "antd";
const { Step } = Steps;


export default class doctorPage extends Component {
    constructor() {
        super();
        this.rowRef = React.createRef()

    }

    state = {select: ''};

    changeColor = (e) => {
        this.rowRef.current.childNodes.forEach((re) => {
            re.firstChild.style.border = '1px solid rgba(0,0,0,0.3)';
        })
        e.currentTarget.style.border = 'green solid 2px';
    }

    doctorSelect=(e)=>{
        this.setState({select:e})

    }

    gpSelected(info,e){

        this.props.gpSelected(info,e,this.state.select)
    }


    render() {
        const doctorInfo = this.props.name.DocInfos.map((doctor)=>(
            <Col span={7}>
                <Card onClick={(e) => {this.changeColor(e)
                                        this.doctorSelect(doctor)}  } >
                    <img alt="example" src={require('../../Images/gp1.png').default} style={{width:177,}}/>
                    <h1>Name: {doctor.Doctor.LastName}</h1>
                    <h2>Gender: {doctor.Doctor.Gender}</h2>
                    <h2>Language: {doctor.Doctor.Language}</h2>
                    <h2>Introduction: {doctor.Doctor.Specialty}</h2>

                </Card>
            </Col>
        ));

        return (
            <div>
                <div className="steps">
                    <Steps current={1}>
                        <Step title="Location"  />
                        <Step title="Doctor"  />
                        <Step title="Time"  />
                    </Steps>
                </div>
                <div className="doctorContent">
                    <h1>Choose the doctor you prefer</h1>

                    <Row ref={this.rowRef} gutter={[48, 48]} >
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
                <div >
                    <button onClick={() => {this.gpSelected(this.props.name,"GpSelected")}}><p>Back</p></button>
                    <button onClick={() => {this.gpSelected(this.props.name,"time")}}><p>Continue</p></button>
                </div>
            </div>
        )}
}