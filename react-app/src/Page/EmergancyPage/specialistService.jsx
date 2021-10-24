import React, {Component} from 'react';
import logo from "../EmergancyPage/static/spelicist.png";
import "./static/emergancyPage1.css";
import cookie from "react-cookies";

let key = require('../../privateData.json');
const googleTranslate = require("google-translate")(key[0].keyTranslate);
const strings = {
    0:"Specialist Service",
    1:"What is Specialist ?",
    2:"The specialist is doctor who are good at a specific area of medicine, such as heart disease, joint disease, cardiology etc. " +
        "Specialist may work in public/ private hospital, private practice and public hospital system. ",
    3:"What can Specialist do for you",
    4:"Specialist are doctor who good at a specific area of medicine, they can provide better treatment for you in the " +
        "specific medicine area. Different specialist can offer different medical care for you. In order to help with " +
        "your health need, it is recommended that see your GP before see a specialist, your GP can help you to find the " +
        "most suitable specialist for you.olve the complex health problems for patient, when GP can not help you, " +
        "hospital will take you and give you treatment.",
    5:"Things about specialist you should know",
    6:"You should get the referral from your GP first before you go to see the specialist, the referral can help the " +
        "specialist know your background information and health issue, then they can provide a better treatment for you.",
    7:"If you don't have a referral and go to see the specialist, some of the specialist may reject provide health service for you.",
    8:"If you want to use Medicare to cover the cost, you need to get a referral from your GP.",
}
const arr = [strings["0"], strings["1"], strings["2"], strings["3"], strings["4"], strings["5"], strings["6"],
    strings["7"], strings["8"]];

class specialistService extends Component {

    state = {
        languageCodes: [],
    };

    //set page on the top when enter to this page
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

    //translate language
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
                            {arr[4]}
                        </p>
                    </div>
                    <br/>

                </div>
                <div className="nextPart">
                    <h2 className="head2">{arr[5]}</h2>
                    <br/>
                    <br/>
                    <br/><br/>
                    <br/>
                    <br/>
                    <div style={{width: '70%'}}>
                        <p className="fontLeft2">
                            - {arr[6]}
                            <br/><br/>
                            - {arr[7]}
                            <br/><br/>
                            - {arr[8]}
                        </p>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }
}
export default specialistService;