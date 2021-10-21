import React, {Component} from 'react';
import logo from "./static/pharmacy.png";
import "./static/emergancyPage1.css";

import cookie from "react-cookies";

let key = require('../../privateData.json');
const googleTranslate = require("google-translate")(key[0].keyTranslate);

const strings = {
    0:"Pharmacy",
    1:"What is pharmacy ?",
    2:"In general, Australian pharmacies are similar to aggregators, not only selling prescription drugs but also " +
        "groceries and health products. The main responsibility of pharmacies is to advise customers on products, " +
        "however, the customers, who need to buy prescription drugs, need to find a pharmacist and " +
        "have a prescription in order to buy the drugs they need.",
    3:"What can pharmacy do for you",
    4:"Give advice of treatment and medicine for minor illness and injuries.",
    5:"Provide prescription medicines.",
    6:"Provide basic medicines",
    7:"provide some vaccine",
    8:"some pharmacists in pharmacy can write medical certificates for you if you can not go to work",
    9:"pharmacist can give you health advice and pharmacy also sell health product",
    10:"How to get prescription medicines",
    11:"Step 1",
    12:"Bring your prescription to pharmacy.",
    13:"Give the prescription to pharmacist.",
    14:"The pharmacist will check the prescription and provides medication",
    15:"Step 2",
    16:"Step 3",
}
const arr = [strings["0"], strings["1"], strings["2"], strings["3"], strings["4"], strings["5"], strings["6"],
    strings["7"], strings["8"], strings["9"], strings["10"], strings["11"], strings["12"], strings["13"], strings["14"], strings["15"], strings["16"]];

class pharmacy extends Component {

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
                this.setState({});
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

                        <p className="fontLeft2">{arr[2]}</p></div>
                        <br/>
                </div>
                <div className="nextPart3">
                    <h2 className="head2">{arr[3]}</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <p className="fontLeft2">
                        - {arr[4]}
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
                        <br/>
                    </p>
                    <br/>

                </div>
                <div className="nextPart">
                    <h2 className="head2">{arr[10]}</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <p className="fontLeft2">
                        - {arr[11]} : {arr[12]}
                        <br/><br/>
                        - {arr[15]} : {arr[13]}
                        <br/><br/>
                        - {arr[16]} : {arr[14]}</p>
                    <br/>
                </div>
            </div>
        );
    }

}

export default pharmacy;