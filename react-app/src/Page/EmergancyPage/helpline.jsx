import React, {Component} from 'react';
import logo from "../EmergancyPage/static/helpline.png";
import "./static/emergancyPage1.css";
import cookie from "react-cookies";

let key = require('../../privateData.json');
const googleTranslate = require("google-translate")(key[0].keyTranslate);
const strings = {
    0: "Helpline",
    1: "What is Helpline ?",
    2: "When you need health care during after hour of your GP or pharmacy, you can call helpline. A registered nurse " +
        "provide help to you and may offer you a call back from a GP. The number of helpline is 1800 022222. The GP " +
        "will contact you in 15 minutes or 1 hour according to the severity of your illness. ",
    3: "Things about helpline you should know",
    4: "The helpline provide 24/7 service to you",
    5: "The helpline can deal with general problem, if under urgency please go to the emergency department of hospital or call 000.",

}
const arr = [strings["0"], strings["1"], strings["2"], strings["3"], strings["4"], strings["5"]];

class helpline extends Component {

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
        let cookieLanguage = cookie.load("language");
        let transQuestion = "";

        // translate the question when selecting a different language
        arr.map((value, index) => {
            if (language !== cookieLanguage) {
                googleTranslate.translate(arr[index], language, function (err, translation) {
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
                        <div style={{width: '50%'}}>
                            <p className="fontLeft2">{arr[2]}</p>
                        </div>
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
                    <div style={{width: '70%'}}>
                        <p className="fontLeft2">
                            - {arr[4]}<br/>
                            - {arr[5]}<br/>
                            <br/>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default helpline;