import React, {Component} from "react";

export default class doctorPage extends Component {
    gpSelected(info,e){
        this.props.gpSelected(info,e)
    }
    render() {
        const gp = this.props.name;
        const doctor = this.props.doctor;
        const date = this.props.date;
        const time = this.props.time;

        return (
        <div>

            <div>
                <h1>gp name: {gp.Gp.GpName}</h1>
                <h1>doctor name: {doctor.Doctor.LastName} {doctor.Doctor.FirstName}</h1>
                <h1>Language: {doctor.Doctor.Language}</h1>
                <h1>gender name: {doctor.Doctor.Gender}</h1>
                <h1>Email: {doctor.Doctor.Email}</h1>
                <h1>Booking Time: {time} - {date}</h1>
                <h1>gp address: {gp.Gp.Address}</h1>
            </div>
            <div>
                <button onClick={() => {this.gpSelected(this.props.name,"backHome")}}><p>Finish</p></button>
            </div>

        </div>

    )}
}
