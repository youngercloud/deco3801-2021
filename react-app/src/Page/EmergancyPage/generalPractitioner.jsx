import React, {Component} from 'react';
import logo from "../EmergancyPage/static/gp.png";



class generalPractitioner extends Component {
    render(){
        return(
            <div>
                <div className="mainDiv">
                    <h2 className="head1">General Practitioner</h2>

                    <br/>
                    <br/>
                    <br/><img className="imageRight2" src={logo}/>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <h2 className="head2">What is GP ?</h2>
                        <br/>
                        <br/>
                        <br/><br/>
                        <br/>
                        <br/>


                        <p className="fontLeft2">The general practitioners are doctor who finish the general practice training, the GP have sufficient qualifications to help you deal with health issue. General practitioner is the first people you should see when you feel unwell and they will help with all your health need. </p>
                        <br/>
                    </div>
                </div>
                <div className="nextPart3">
                    <h2 className="head2">What can GP do for you</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <p className="fontLeft2">
                        - Give you health advice
                        <br/><br/>
                        - Provide regular medical check-up
                        <br/><br/>
                        - Help to manage you and your family health
                        <br/><br/>
                        - Help with mental health issues
                        <br/><br/>
                        - Treat injuries and illness
                        <br/><br/>
                        - Manage long-term condition, such as heart disease, asthma...
                        <br/><br/>
                        - Prescribe medicines and provide immunisation
                        <br/><br/>

                        <h4 id="redfont">Notice:</h4>If the GP can not solves your problem, they will refer you to a specialist doctor or hospital, you need a referral from your GP before you go to see a specialist doctor
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
                <div className="nextPart4">
                    <div className="leftDiv">
                        <h2 className="head3">How to find a GP</h2>
                        <br/>
                        <br/>
                        <br/><br/>
                        <br/>
                        <br/>
                        <p className="fontLeft2">
                            - You can use the online booking function in our website, which can help you book a consult with GP.
                            <br/><br/>
                            - Get recommendation from your friend, community or family...
                            <br/><br/>

                        </p>
                    </div>
                    <div className="verticalLine"></div>
                    <div className="rightDiv">
                        <h2 className="head3">After hour service?</h2>
                        <br/>
                        <br/>
                        <br/><br/>
                        <br/>
                        <br/>
                        <p className="fontLeft2">
                            - If you need medical care during the GP after hour time, you can get advice from helpline.
                            <br/><br/>
                            - If under emergency, you can call 000 and use the Emergency Department service.
                            <br/><br/>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

export default generalPractitioner;