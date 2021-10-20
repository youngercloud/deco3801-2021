import React, {Component} from 'react';
import './static/emergancyPage1.css'
import image1 from "../EmergancyPage/static/image1.jpeg";
import image2 from "../EmergancyPage/static/image2.jpeg";
import image3 from "../EmergancyPage/static/image3.jpeg";
import image4 from "../EmergancyPage/static/image4.png";
import image5 from "../EmergancyPage/static/image5.jpeg";
import image6 from "../EmergancyPage/static/image6.jpeg";
import image7 from "../EmergancyPage/static/image7.jpeg";

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

const arr = []
for (let k of Object.keys(strings)) {
    arr.push(strings[k])
}


class emergancyPage1 extends Component {
    render(){
        return(
            <div>
                <div id="FirstRcorners"><p>Choosing us, chooseing the best partner in life</p></div>
                <div>
                    <img className="imageLeft" src={image1}/>
                    <h2>Introduction</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>


                    <p className="leftFont">In general, Australian pharmacies are similar to aggregators, not only selling

                        prescription drugs but also groceries

                        and health products. The main

                        responsibility of pharmacies is to advise

                        customers on products, however, the

                        customers, who need to buy

                        prescription drugs, need to find a

                        pharmacist and have a prescription in

                        order to buy the drugs they need.</p>
                </div>
                <div className="line"/>
                <div className="divFragment">
                    <h1>What you can do:</h1>
                    <div className="segment1">
                        <img className="imageLeft" src={image2}/>
                        <div class="SecondRcorners"><p>Upload your prescription or get a new online prescription.</p></div>
                    </div>
                    <div className="segment3">
                        <img className="imageRight" src={image3}/>
                        <div className="thirdRcorners"><p>Shop online with local pharmacies for off-the-shelf items.</p></div>
                    </div>
                    <div className="segment2">
                        <img className="imageLeft" src={image4}/>
                        <div className="SecondRcorners2"><p>Choose pharmacy pick up time</p></div>
                    </div>
                </div>
                <div className="divFragment2">
                    <div className="line"></div>
                    <div className ="div1"><p>Step 1:</p></div>
                    <div className="shortLine"></div>
                    <div className ="div2"><p>Step 2:</p></div>
                    <div className="shortLine2"></div>
                    <div className ="div3"><p>Step 3:</p></div>
                </div>
                <div className="divFragment3">
                    <div className ="div11"><p>Bring the prescription to us</p></div>
                    <div className="shortLine3"></div>
                    <div className ="div22"><p>Submit the prescription to pharmacist</p></div>
                    <div className="shortLine4"></div>
                    <div className ="div33"><p>The pharmacist confirms and provides medication</p></div>
                </div>
                <div className="divFragment3">
                    <div className ="div111"><img className="image5" src={image5}/><p>Basic drugs</p></div>
                    <div className="shortLine5"></div>
                    <div className ="div222"><img className="image6" src={image6}/><p>Health care products</p></div>
                    <div className="shortLine6"></div>
                    <div className ="div333"><img className="image7" src={image7}/><p>Articles for daily use</p></div>
                </div>
            </div>
        );
    }

}

export default emergancyPage1;



