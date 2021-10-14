import React, {Component} from 'react';
import logo from "../EmergancyPage/static/helpline.png";
import "./static/emergancyPage1.css";

class helpline extends Component {
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
                    <h2 className="head1">Helpline</h2>
                    <br/>
                    <br/>
                    <br/><img className="imageRight2" src={logo}/>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <h2 className="head2">What is Helpline ?</h2>
                        <br/>
                        <br/>
                        <br/><br/>
                        <br/>
                        <br/>

                        <p className="fontLeft2">When you need health care during after hour of your GP or pharmacy, you can call helpline. A registered nurse provide help to you and may offer you a call back from a GP. The number of helpline is 1800 022222. The GP will contact you in 15 minutes or 1 hour according to the severity of your illness. </p>
                        <br/>
                    </div>
                </div>
                <div className="nextPart3">
                    <h2 className="head2">Things about helpline you should know</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <p className="fontLeft2">
                        - The helpline provide 24/7 service to you<br/>

                        - The helpline can deal with general problem, if under urgency please go to the emergency department of hospital or call 000.<br/>
                        <br/>
                    </p>
                </div>
            </div>
        );
    }

}

export default helpline;