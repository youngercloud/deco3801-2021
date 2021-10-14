import React, {Component} from 'react';
import logo from "../EmergancyPage/static/emergency.png";
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


class emergencyDepartment extends Component {

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
                    <h2 className="head1">Emergency Department</h2>

                    <br/>
                    <br/>
                    <br/><img className="imageRight2" src={logo}/>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <h2 className="head2">What is Emergency Department ?</h2>
                        <br/>
                        <br/>
                        <br/><br/>
                        <br/>
                        <br/>


                        <p className="fontLeft2">An emergency department is a part of hospital, most public hospital in Australia have an emergency department. Our Emergency Department(ED) provides 24 hour medical care to patients who need urgent medical or surgical care.  Use emergency department in any urgent situation, for general, less serious conditions please seek help in general practitioner.  </p>
                        <br/>
                    </div>
                </div>
                <div className="nextPart3">
                    <h2 className="head2">When should use ED</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <p className="fontLeft2">
                        Under any urgent situation, for example
                        <br/><br/>
                        - injuries from accidents, physical assaults or falls
                        <br/><br/>
                        - severe pain
                        <br/><br/>
                        - heart attack and stroke
                        <br/><br/>
                        - broken bones
                        <br/><br/>
                        - allergic reactions
                        <br/><br/>
                        - etc
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

export default emergencyDepartment;