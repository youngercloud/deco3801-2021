import React, {Component} from 'react';
import logo from "../EmergancyPage/static/helpline.png";
import "./static/emergancyPage1.css";


import cookie from "react-cookies";

let key = require('../../privateData.json');
const googleTranslate = require("google-translate")(key[0].keyTranslate);

const strings = {
    0:"",
    1:"",
    2:"",
    3:"",
    4:"",
    5:"",
    6:"",
    7:"",
    8:"",
    9:"",
    10:"",
    11:"",
    12:"",
    13:"",
    14:"",
    15:"",
    16:"",
    17:"",
    18:"",
    19:"",
    20:"",

}
const arr = [strings["0"], strings["1"], strings["2"], strings["3"], strings["4"], strings["5"], strings["6"],
    strings["7"], strings["8"], strings["9"], strings["10"], strings["11"], strings["12"], strings["13"], strings["14"]
    , strings["15"], strings["16"], strings["17"], strings["18"], strings["19"], strings["20"]];


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