import React, {Component} from 'react';
import './static/card.css'
import {Image} from "antd";

class DoctorCard extends Component {
    render() {
        return (
            <div onClick={this.props.onClick} className="card-style"
                style={{height: "360px", width: "100%"}}>
                <div style={{height: "200px"}}>
                    <Image preview={false}  height="200px"
                        alt="example" src={this.props.image} />
                </div>
                <div style={{height: "100px", padding: "20px"}}>
                    <p children={this.props.firstName + " " + this.props.lastName} style={{
                        fontWeight: "bold",
                        fontSize: 20,
                        textAlign: "left",
                        margin: 0,
                        padding: 0,
                    }}/>
                    <p children={this.props.gpName}
                       style={{marginTop: 6}}
                       className="doctor-card-info-display"/>
                    <p children={this.props.docLanguage + " Speaking Doctor"}
                       className="doctor-card-info-display"/>
                    <p children={"Booked at: " + this.props.bookingTime}
                       className="doctor-card-info-display"/>
                </div>
            </div>
        );
    }
}

export default DoctorCard;