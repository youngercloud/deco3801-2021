import React, {Component} from 'react';
import logo from "../EmergancyPage/static/gp.png";
import "./static/emergancyPage1.css";
import cookie from "react-cookies";
import {Col, Row} from "antd";

let key = require('../../privateData.json');
const googleTranslate = require("google-translate")(key[0].keyTranslate);
const strings = {
    0: "General Practitioner",
    1: "What is GP ?",
    2: "The general practitioners are doctor who finish the general practice training, the GP have sufficient " +
        "qualifications to help you deal with health issue. General practitioner is the first people you should " +
        "see when you feel unwell and they will help with all your health need. ",
    3: "What can GP do for you",
    4: "Give you health advice",
    5: "Provide regular medical check-up",
    6: "Help to manage you and your family health",
    7: "Help with mental health issues",
    8: "Treat injuries and illness",
    9: "Manage long-term condition, such as heart disease, asthma",
    10: "Prescribe medicines and provide immunisation",
    11: "Notice",
    12: "If the GP can not solves your problem, they will refer you to a specialist doctor or hospital, you need a " +
        "referral from your GP before you go to see a specialist doctor",
    13: "Things about hospital you should know",
    14: "You should go to GP before you go to hospital.",
    15: "If you have urgent issue such as serious illness and injuries you can go to emergency department of hospital directly.",
    16: "The public hospital and private hospital have some difference, choose wisely accord to your need.",
    17: "You can use the online booking function in our website, which can help you book a consult with GP.",
    18: "Get recommendation from your friend, community or family",
    19: "After hour service",
    20: "If you need medical care during the GP after hour time, you can get advice from helpline.",
    21: "If under emergency, you can call 000 and use the Emergency Department service.",
    22: "Find a GP"

}
const arr = []
for (let k of Object.keys(strings)) {
    arr.push(strings[k])
}


class generalPractitioner extends Component {

    state = {
        languageCodes: [],
    };

    //set page on the top when enter to this page
    componentDidMount() {
        // load all of the language options from Google Translate to your app state
        googleTranslate.getSupportedLanguages("en", function (err, languageCodes) {
            getLanguageCodes(languageCodes); // use a callback function to setState
        });
        const getLanguageCodes = languageCodes => {
            this.setState({languageCodes});
        };

        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            //window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, 0);
        }
    }

    //translate language
    changeHandler = language => {

        let transQuestion = "";

        // translate the question when selecting a different language
        arr.map((value, index) => {

                googleTranslate.translate(arr[index], language, function (err, translation) {
                    transQuestion = translation.translatedText;
                    translating(transQuestion, index);
                });

        })

        const translating = (transQuestion, index) => {
            if (arr !== transQuestion) {
                arr[index] = transQuestion;
                // cookie.save("question", transQuestion, { path: "/" });
                this.setState({})
            }
        };

        this.setState({language});
        cookie.save("language", language, {path: "/"});

        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            //window.requestAnimationFrame(smoothscroll);
            window.scrollTo(0, 0);
        }
    };

    render() {
        const {languageCodes, language} = this.state;
        return (
            <div>
                <select className="medical-service-select-language" value={language} onChange={(e) => {
                    this.changeHandler(e.target.value)
                }}>
                    <option value="" selected disabled hidden>Choose a language</option>
                    {languageCodes.map(lang => (
                        <option key={lang.language} value={lang.language}>
                            {lang.name}
                        </option>
                    ))}
                </select>
                <div className="mainDiv">
                    <h2 className="head1">{arr[0]}</h2>
                    <br/>
                    <br/>
                    <br/>
                    <img className="imageRight2" src={logo}/>

                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <h2 className="head2">{arr[1]}</h2>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div style={{width: "50%"}}>
                            <p className="fontLeft2">{arr[2]}</p>
                        </div>
                        <br/>
                    </div>
                </div>
                <div className="nextPart3">
                    <h2 className="head2-second">{arr[3]}</h2>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                    <p className="fontLeft2">
                        - {arr[4]}
                        <br/>
                        - {arr[5]}
                        <br/>
                        - {arr[6]}
                        <br/>
                        - {arr[7]}
                        <br/>
                        - {arr[8]}
                        <br/>
                        - {arr[9]}...
                        <br/>
                        - {arr[10]}
                        <br/>
                        <br/>
                        <div style={{width: "50%", marginLeft: "18%"}}>
                            <h4 id="redfont">{arr[11]}</h4>
                            {arr[12]}
                        </div>

                        <br/>
                        <br/>
                    </p>
                </div>
                <div className="nextPart">
                    <h2 className="head2-second">{arr[13]}</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <div>
                        <p className="fontLeft2">
                            - {arr[14]}<br/><br/>

                            - {arr[15]}<br/><br/>

                            - {arr[16]}
                        </p>
                    </div>

                    <br/>
                </div>
                <Row className="nextPart4">
                    <Col offset={1} span={10}>
                        <h2 className="head3">{arr[22]}</h2>
                        <p className="fontLeft2">
                            - {arr[17]}
                            <br/><br/>
                            - {arr[18]}...
                            <br/><br/>
                        </p>
                    </Col>
                    <Col offset={1} span={10}>
                        <h2 className="head3">{arr[19]}</h2>
                        <p className="fontLeft2">
                            - {arr[20]}
                            <br/><br/>
                            - {arr[21]}
                            <br/><br/>
                        </p>
                    </Col>
                </Row>
            </div>
        );
    }

}

export default generalPractitioner;