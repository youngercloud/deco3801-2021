import React, {Component} from 'react';
import logo from "../EmergancyPage/static/spelicist.png";
import "./static/emergancyPage1.css";


class specialistService extends Component {
    componentDidMount() {
        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            //window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,0);
        }
    }
    render(){
        return(
            <div>
                <div className="mainDiv">
                    <h2 className="head1">Specialist Service</h2>

                    <br/>
                    <br/>
                    <br/><img className="imageRight2" src={logo}/>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <h2 className="head2">What is Specialist ?</h2>
                        <br/>
                        <br/>
                        <br/><br/>
                        <br/>
                        <br/>


                        <p className="fontLeft2">The specialist is doctor who are good at a specific area of medicine, such as heart disease, joint disease, cardiology etc.
                            Specialist may work in public/ private hospital, private practice and public hospital system.  </p>
                        <br/>
                    </div>
                </div>
                <div className="nextPart3">
                    <h2 className="head2">What can Specialist do for you</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <p className="fontLeft2">
                        Specialist are doctor who good at a specific area of medicine, they can provide better treatment for you in the specific medicine area. Different specialist can offer different medical care for you. In order to help with your health need, it is recommended that see your GP before see a specialist, your GP can help you to find the most suitable specialist for you.olve the complex health problems for patient, when GP can not help you, hospital will take you and give you treatment.
                    </p>
                    <br/>

                </div>
                <div className="nextPart">
                    <h2 className="head2">Things about specialist you should know</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <p className="fontLeft2">
                        - You should get the referral from your GP first before you go to see the specialist, the referral can help the specialist know your background information and health issue, then they can provide a better treatment for you.
                        <br/><br/>
                        - If you don't have a referral and go to see the specialist, some of the specialist may reject provide health service for you.
                        <br/><br/>
                        - If you want to use Medicare to cover the cost, you need to get a referral from your GP. </p>
                    <br/>
                </div>
            </div>
        );
    }

}

export default specialistService;