import React, {Component} from 'react';
import logo from "../EmergancyPage/static/hosptial.png";
import "./static/emergancyPage1.css";

import cookie from "react-cookies";

let key = require('../../privateData.json');
const googleTranslate = require("google-translate")(key[0].keyTranslate);

const strings = {
    0:"Hospital",
    1:"Hospitals in Australia",
    2:"In Australia, there are private hospital and public hospital. When you have urgent health issue, you " +
        "can go to the emergency department of hospitals, if you have normal or general health issue, it is " +
        "recommended that go to see GP first.",
    3:"What can hospital do for you",
    4:"Provide surgery service for patient.",
    5:"Solve the urgent health issue for patient.",
    6:"Solve the complex health problems for patient, when GP can not help you, hospital will take you and give you treatment.",
    7:"Things about hospital you should know",
    8:"You should go to GP before you go to hospital.",
    9:"If you have urgent issue such as serious illness and injuries you can go to emergency department of hospital directly.",
    10:"The public hospital and private hospital have some difference, choose wisely accord to your need.",
    11:"Public Hospital",
    12:"Patients need to wait before get treatment according to the severity of illness",
    13:"Public hospital has more comprehensive sections.",
    14:"The environment of public hospital  may not meet your need(for example, they may not have single people room for patient)",
    15:"The hospital will arrange doctor for you, you may not choose who be your doctor.",
    16:"Less cost.",
    17:"Private Hospital",
    18:"The private hospital have higher efficiency, normally patient will get treatment as soon as possible",
    19:"Private hospital may not have sections that you need.",
    20:"The private hospital can provide better environment and service for patients.",
    21:"You can choose your doctor, and more personalized",
    22:"More expensive, if you have insurance, that can help to cover cost"

}
const arr = [strings["0"], strings["1"], strings["2"], strings["3"], strings["4"], strings["5"], strings["6"],
    strings["7"], strings["8"], strings["9"], strings["10"], strings["11"], strings["12"], strings["13"], strings["14"]
    , strings["15"], strings["16"], strings["17"], strings["18"], strings["19"], strings["20"], strings["21"], strings["22"]];


class hospitals extends Component {

    state = {
        languageCodes: [],
    };

    componentDidMount() {
        // load all of the language options from Google Translate to your app state
        googleTranslate.getSupportedLanguages("en", function(err, languageCodes) {
            getLanguageCodes(languageCodes); // use a callback function to setState
        });
        const getLanguageCodes = languageCodes => {
            this.setState({ languageCodes });
        };

        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            //window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,0);
        }
    }

    changeHandler = language => {
        let cookieLanguage = cookie.load("language");
        let transQuestion = "";

        // translate the question when selecting a different language
        arr.map((value, index) => {
            if (language !== cookieLanguage) {
                googleTranslate.translate(arr[index], language, function(err, translation) {
                    console.log(translation.translatedText);
                    transQuestion = translation.translatedText;
                    translating(transQuestion, index);
                });
            }
        })

        const translating = (transQuestion, index) => {
            if (arr !== transQuestion) {
                arr[index] = transQuestion;
                // cookie.save("question", transQuestion, { path: "/" });
                this.setState({})
            }
        };

        this.setState({ language });
        cookie.save("language", language, { path: "/" });

        const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            //window.requestAnimationFrame(smoothscroll);
            window.scrollTo (0,0);
        }
    };


    render(){
        const {languageCodes, language} = this.state;
        return(
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
                    <br/><img className="imageRight2" src={logo}/>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        <h2 className="head2">{arr[1]}</h2>
                        <br/>
                        <br/>
                        <br/><br/>
                        <br/>
                        <br/>


                        <p className="fontLeft2">{arr[2]} </p>
                        <br/>
                    </div>
                </div>
                <div className="nextPart3">
                    <h2 className="head2">{arr[3]}</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <p className="fontLeft2">
                        - {arr[4]}<br/><br/>
                        - {arr[5]}<br/><br/>
                        - {arr[6]}
                        <br/><br/>
                    </p>
                </div>
                <div className="nextPart">
                    <h2 className="head2">{arr[7]}</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <p className="fontLeft2">
                        - {arr[8]} <br/><br/>

                        - {arr[9]}<br/><br/>

                        - {arr[10]}
                    </p>
                    <br/>
                </div>
                <div className="nextPart2">
                    <div className="leftDiv">
                        <h2 className="head3">{arr[11]}</h2>
                        <br/>
                        <br/>
                        <br/><br/>
                        <br/>
                        <br/>
                        <p className="fontLeft2">
                            - {arr[12]}
                            <br/><br/>
                            - {arr[13]}
                            <br/><br/>
                            - {arr[14]}
                            <br/><br/>
                            - {arr[15]}
                            <br/><br/>
                            - {arr[16]}
                        </p>
                    </div>
                    <div className="verticalLine"></div>
                    <div className="rightDiv">
                        <h2 className="head3">{arr[17]}</h2>
                        <br/>
                        <br/>
                        <br/><br/>
                        <br/>
                        <br/>
                        <p className="fontLeft2">
                            - {arr[18]}
                            <br/><br/>
                            - {arr[19]}
                            <br/><br/>
                            - {arr[20]}
                            <br/><br/>
                            <br/><br/>
                            - {arr[21]}
                            <br/><br/>
                            - {arr[22]}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

export default hospitals;