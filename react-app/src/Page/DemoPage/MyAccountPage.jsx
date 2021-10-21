import React, {Component, useRef} from "react";
import "./static/myAccount.css";

import {Alert, Button, Card, Col, DatePicker, Image, Row} from 'antd';
import doctorImage from "../../Images/goodman.jpeg";
import axios from "axios";
import Time from "../MainPage/Time";

const {Meta} = Card;


let Gender;
let Language;
let DoB;
let Mail;
let PhoneNumber;

export default class Footer extends Component {

    state = {
        name:sessionStorage.getItem("name"),
        password:sessionStorage.getItem("password"),
        status:'block',
        Gender:null,
        Language:null,
        DoB:null,
        Mail:null,
        PhoneNumber:null,
        demo:null,
    }

    componentDidMount() {
        let api;
        api = "/api/login/user"
        axios.post(api, this.state).then((response) => {
            this.setState({Gender:response.data.User.Gender});
            this.setState({Language:response.data.User.Language});
            this.setState({DoB:response.data.User.DoB});
            this.setState({Mail:response.data.User.Mail});
            this.setState({PhoneNumber:response.data.User.PhoneNumber});
            console.log(this.state)
        }).catch(function (error) {
            console.log(error);
        });
    }

    changeState(){
        if (this.state.status==="block"){
            this.setState({status:"none"})
        }else if(this.state.status==="none"){
            this.setState({status:"block"})
        }
    }

    onChangeDate=(now)=> {
        let time = new Date(now._d)
        let d = new Date(time);
        let dateValue = d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
        this.setState({demo:dateValue})
    }

    saveData(){
        if (this.state.status==="block"){
            this.setState({status:"none"})

        }else if(this.state.status==="none"){
            this.setState({status:"block"})

        }
        // store value
        this.setState({Language:Language.value})
        this.setState({Gender:Gender.value});
        this.setState({DoB:this.state.demo});
        this.setState({Mail:Mail.value});
        this.setState({PhoneNumber:PhoneNumber.value});

        let api;
        api = "/api/changeInformation"
        axios.post(api, this.state).then((response) => {
            console.log("change data")
        }).catch(function (error) {
            console.log(error);
        });

    }

    render() {

        return (
            <div className="account">
                    <Row gutter={[48, 48]} justify="center">
                        <h1>My information</h1>
                    </Row>
                    <div style={{width: '75%', marginLeft: '12.5%', marginBottom: '5%'}}>
                        <hr/>
                    </div>

                    <Row gutter={[48, 48]} justify="left">
                        <Col span={4}/>
                        <Col span={10}>
                            <div style={{textAlign:"left"}}>
                                <Row>
                                    <Col span={12}>
                                        <h2>Name: </h2>
                                        <h3>{sessionStorage.getItem("name")}</h3>
                                    </Col>
                                    <Col span={12}>
                                        <h2>Gender:  </h2>
                                        <h3 style={{display:this.state.status}}>{this.state.Gender}</h3>
                                        {this.state.status==="none" ? <select ref={select=>Gender=select}>
                                            {this.state.Gender==="male"?  <option  value="male" selected>male</option>:<option  value="male" >male</option>}
                                            {this.state.Gender==="female"?  <option  value="female" selected>female</option>:<option  value="female" >female</option>}
                                            </select>:null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <h2>Language: </h2>
                                        <h3 style={{display:this.state.status}}>{this.state.Language}</h3>
                                        {this.state.status==="none" ? <input defaultValue={this.state.Language}
                                                                             ref={input=>Language=input}
                                        />:null}
                                    </Col>
                                    <Col span={12}>
                                        <h2>Date of Birth: </h2>
                                        <h3 style={{display:this.state.status}}>{this.state.DoB}</h3>
                                        {this.state.status==="none" ? <DatePicker  format="YYYY/MM/DD " onChange={this.onChangeDate.bind(this)}/>:null}
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <h2>Email Address: </h2>
                                        <h3 style={{display:this.state.status}}>{this.state.Mail}</h3>
                                        {this.state.status==="none" ? <input defaultValue={this.state.Mail} ref={input=>Mail=input}/>:null}
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <h2>Phone Number: </h2>
                                        <h3 style={{display:this.state.status}}>{this.state.PhoneNumber}</h3>
                                        {this.state.status==="none" ? <input defaultValue={this.state.PhoneNumber} ref={input=>PhoneNumber=input}/>:null}
                                    </Col>
                                </Row>


                            </div>
                        </Col>
                        <Col span={6}>
                            <Image src={doctorImage}/>
                            {this.state.status==="none" ? <button onClick={()=>this.saveData()}>Save Data</button>:<button onClick={()=>this.changeState()}>Edit profile</button>}
                        </Col>
                    </Row>

                    <div style={{width: '75%', marginLeft: '12.5%', marginTop: '10%', marginBottom:"10%",paddingBottom:"10%"}}>
                        <hr/>
                    </div>

            </div>

        );
    }
}
