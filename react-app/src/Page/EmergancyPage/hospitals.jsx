import React, {Component} from 'react';
import logo from "../EmergancyPage/static/hosptial.png";



class hospitals extends Component {
    render(){
        return(
            <div>
                <div className="mainDiv">
                    <h2 className="head1">Hostipal</h2>

                    <br/>
                    <br/>
                    <br/><img className="imageRight2" src={logo}/>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <h2 className="head2">Hospitals in Australia</h2>
                        <br/>
                        <br/>
                        <br/><br/>
                        <br/>
                        <br/>


                        <p className="fontLeft2">In Australia, there are private hospital
                            and public hospital. When you have urgent health issue, you
                            can go to the emergency department of hospitals, if you have
                            normal or general health issue, it is recommended that go to see GP first. </p>
                        <br/>
                    </div>
                </div>
                <div className="nextPart3">
                    <h2 className="head2">What can hospital do for you</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <p className="fontLeft2">
                        - Provide surgery service for patient.<br/><br/>
                        - Solve the urgent health issue for patient.<br/><br/>
                        - Solve the complex health problems for patient, when GP can not help you, hospital will take you and give you treatment.
                        <br/><br/>
                    </p>
                </div>
                <div className="nextPart">
                    <h2 className="head2">Things about hospital you should know</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <p className="fontLeft2">
                        - You should go to GP before you go to hospital. <br/><br/>

                        - If you have urgent issue such as serious illness and injuries you can go to emergency department of hospital directly.<br/><br/>

                        - The public hospital and private hospital have some difference, choose wisely accord to your need.
                    </p>
                    <br/>
                </div>
                <div className="nextPart2">
                    <div className="leftDiv">
                        <h2 className="head3">Public Hospital</h2>
                        <br/>
                        <br/>
                        <br/><br/>
                        <br/>
                        <br/>
                        <p className="fontLeft2">
                            - Patients need to wait before get treatment according to the severity of illness
                            <br/><br/>
                            - Public hospital has more comprehensive sections.
                            <br/><br/>
                            - The environment of public hospital  may not meet your need(for example, they may not have single people room for patient)
                            <br/><br/>
                            - The hospital will arrange doctor for you, you may not choose who be your doctor.
                            <br/><br/>
                            - Less cost.
                        </p>
                    </div>
                    <div className="verticalLine"></div>
                    <div className="rightDiv">
                        <h2 className="head3">Private Hospital</h2>
                        <br/>
                        <br/>
                        <br/><br/>
                        <br/>
                        <br/>
                        <p className="fontLeft2">
                            - The private hospital have higher efficiency, normally patient will get treatment as soon as possible
                            <br/><br/>
                            - Private hospital may not have sections that you need.
                            <br/><br/>
                            - The private hospital can provide better environment and service for patients.
                            <br/><br/>
                            <br/><br/>
                            - You can choose your doctor, and more personalized
                            <br/><br/>
                            - More expensive, if you have insurance, that can help to cover cost
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

export default hospitals;