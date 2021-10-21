import React, {Component} from 'react';
import logo from "../EmergancyPage/static/emergency.png";
import "./static/emergancyPage1.css";

import cookie from "react-cookies";

let key = require('../../privateData.json');
const googleTranslate = require("google-translate")(key[0].keyTranslate);

const strings = {
    0:"Emergency Department",
    1:"What is Emergency Department ?",
    2:"An emergency department is a part of hospital, most public hospital in Australia have an emergency department. " +
        "Our Emergency Department(ED) provides 24 hour medical care to patients who need urgent medical or surgical " +
        "care.  Use emergency department in any urgent situation, for general, less serious conditions please seek" +
        " help in general practitioner.  ",
    3:"When should use Emergency Department(ED)",
    4:"Under any urgent situation, for example",
    5:"injuries from accidents, physical assaults or falls",
    6:"severe pain",
    7:"heart attack and stroke",
    8:"broken bones",
    9:"allergic reactions",
    10:"etc",
    11:"Things about specialist you should know",
    12:"You should get the referral from your GP first before you go to see the specialist, the referral can help the " +
        "specialist know your background information and health issue, then they can provide a better treatment for you.",
    13:"If you don't have a referral and go to see the specialist, some of the specialist may reject provide health service for you.",
    14:"If you want to use Medicare to cover the cost, you need to get a referral from your GP.",
}
const arr = [strings["0"], strings["1"], strings["2"], strings["3"], strings["4"], strings["5"], strings["6"],
    strings["7"], strings["8"], strings["9"], strings["10"], strings["11"], strings["12"], strings["13"], strings["14"]];


class emergencyDepartment extends Component {

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


                        <p className="fontLeft2">{arr[2]}</p>
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
                        {arr[4]}
                        <br/><br/>
                        - {arr[5]}
                        <br/><br/>
                        - {arr[6]}
                        <br/><br/>
                        - {arr[7]}
                        <br/><br/>
                        - {arr[8]}
                        <br/><br/>
                        - {arr[9]}
                        <br/><br/>
                        - {arr[10]}
                    </p>
                    <br/>

                </div>
                <div className="nextPart">
                    <h2 className="head2">{arr[11]}</h2>
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
                        - {arr[14]} </p>
                    <br/>
                </div>
            </div>
        );
    }

}

export default emergencyDepartment;