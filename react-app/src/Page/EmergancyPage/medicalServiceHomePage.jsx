import React, {Component} from 'react';
import './static/medicalService.css'
import image1 from "../EmergancyPage/static/m1.png";
import image2 from "../EmergancyPage/static/m2.png";
import image3 from "../EmergancyPage/static/m3.png";
import image4 from "../EmergancyPage/static/m4.png";
import image5 from "../EmergancyPage/static/m5.png";
import image6 from "../EmergancyPage/static/m6.png";
import cookie from "react-cookies";
import {Select} from "antd";

let key = require('../../privateData.json');
const googleTranslate = require("google-translate")(key[0].keyTranslate);

let strings = {
    0:"Medical Service",
    1:"In Australia",
    2:"The medical system in Australia have many different types and times to provide health care for you",
    3:"Main place to offer medical care for you!",
    4:"More Detail Here",
    5:"In Australia, in the first place, people usually go to GP when they need medical care.",
    6:"Primary",
    7:"Help with general health issue",
    8:"Learn more",
    9:"Emergency Department",
    10:"Help with urgent issue",
    11:"Advanced",
    12:"Specialist Service",
    13:"Provide help in specific area of medicine",
    14:"Hospitals",
    15:"Offer surgery, deal with serious diseases",
    16:"Other",
    17:"Pharmacy",
    18:"Provide medicine for minor illness",
    19:"Helpline",
    20:"Help from Registered nurse on phone",
    21:"Doctor who finish the general practice training",
    22:"Doctor help with general health issue and manage your health",
    23:"First person you should see if feel unwell",
    24:"Provide help for people in emergency for 24/7",
    25:"If have urgent issue, call 000 to get emergency service",
    26:"Also you can go to ED of one hospital directly under urgent case",
    27:"Doctor who are good at a specific area of medicine, such as heart disease",
    28:"You need referral from your GP before you wo see a specific",
    29:"Specialist normal work in hospital",
    30:"Provide  surgery service for patient",
    31:"The hospital system consist of private and public hospital",
    32:"Hospital will help with complex health issue for patient",
    33:"Help with minor illness and injures",
    34:"Sell health product",
    35:"Sell medicine and can provide vaccines",
    36:"You can get help when during after hour time",
    37:"Provide help 24/7",
    38:"May give you a call back from a GP",
    39:"General Practitioner",
    40:"Emergency Department",
    41:"Specialist",
    42:"Hospital",
    43:"Pharmacy",

}

const arr = []
for (let k of Object.keys(strings)) {
    arr.push(strings[k])
}


class medicalServiceHomePage extends Component {

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

    serviceSelected(info){
        this.props.serviceSelected(info)
    }

    render(){
        const {languageCodes, language} = this.state;
        return(
            <div>
                <select className="medical-service-select-language" style={{width: '20%'}}
                        value={language} onChange={(e) => {
                    this.changeHandler(e.target.value)
                }}>
                    <option value="" selected disabled hidden>Choose a language</option>
                    {languageCodes.map(lang => (
                        <option key={lang.language} value={lang.language}>
                            {lang.name}
                        </option>
                    ))}
                </select>
                <div className="body-class">
                    <div className="header-m">
                        <h1>{arr[0]}</h1>
                        <h1>{arr[1]}</h1>
                        <div id="FirstP">
                            <p>{arr[2]}</p>
                        </div>
                        <br/>
                        <div className="front-background-wrapper">
                            <div className="front-background-box">
                                <div className="header-content-wrapper">
                                    <h2 className="fiveMark">5</h2>
                                </div>
                                <div className="header-content-wrapper" id="text-along-bigger">
                                    <p className="header-content-5items-topic">{arr[3]}</p>
                                    <p className="header-content-5items">{arr[39]}</p>
                                    <p className="header-content-5items">{arr[40]}</p>
                                    <p className="header-content-5items">{arr[41]}</p>
                                    <p className="header-content-5items">{arr[42]}</p>
                                    <p className="header-content-5items">{arr[43]}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="information-wrapper">
                            <div className="information-box">
                                <div className="information-title-box">
                                    <h1>{arr[4]}</h1>
                                </div>
                                <div className="information-content-box">
                                    <p id="SecondP">{arr[5]}</p>
                                </div>
                            </div>
                        </div>
                        <div className="primary-wrapper">
                            <div className="primary-box">
                                <div className="primary-title-box">
                                    <h1 id="margin-fixed">{arr[6]}</h1>
                                </div>
                                <div className="primary-content-box">
                                    <div className="primary-information-box">
                                        <div className="horizontal-line-box">
                                            <hr/>
                                        </div>
                                        <div className="primary-info-content-box" id="gp">
                                            <h2 className="primary-info-content-top" id="inside-image-title">
                                                GP
                                            </h2>
                                            <p className="content_middle" id="inside-image-word">
                                                {arr[7]}
                                            </p>
                                            <img src={image6} width="115px" height="100px"/>
                                            <div className="gp-hover">
                                                <div className="title-image">
                                                    <img src={image6} width="69px" height="60px" id="title-image1"/>
                                                </div>
                                                <p className="content_middle" id="inside-image-word">
                                                    1. {arr[21]}
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    2. {arr[22]}
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    3. {arr[23]}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick={() => this.serviceSelected("gp")}>
                                                <strong>{arr[8]}</strong>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="primary-information-box" id="separate-second">
                                        <div className="horizontal-line-box">
                                            <hr/>
                                        </div>
                                        <div className="primary-info-content-box" id="ed">
                                            <h2 className="primary-info-content-top" id="inside-image-title">
                                                {arr[9]}
                                            </h2>
                                            <p className="content_middle" id="inside-image-word">
                                                {arr[10]}
                                            </p>
                                            <img src={image4} width="115px" height="100px"/>
                                            <div className="ed-hover">
                                                <div className="title-image">
                                                    <img src={image4} width="69px" height="60px" id="title-image2"/>
                                                </div>
                                                <p className="content_middle" id="inside-image-word">
                                                    1. {arr[24]}
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    2. {arr[25]}
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    3. {arr[26]}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                     onClick={() => this.serviceSelected("emergency")}>
                                                <strong>{arr[8]}</strong>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="primary-wrapper">
                            <div className="primary-box">
                                <div className="primary-title-box">
                                    <h1 id="margin-fixed">{arr[11]}</h1>
                                </div>
                                <div className="primary-content-box">
                                    <div className="primary-information-box">
                                        <div className="horizontal-line-box">
                                            <hr/>
                                        </div>
                                        <div className="primary-info-content-box" id="ed">
                                            <h2 className="primary-info-content-top" id="inside-image-title">
                                                {arr[12]}
                                            </h2>
                                            <p className="content_middle" id="inside-image-word">
                                                {arr[13]}
                                            </p>
                                            <img src={image1} width="115px" height="100px"/>
                                            <div className="ed-hover">
                                                <div className="title-image">
                                                    <img src={image1} width="69px" height="60px" id="title-image2"/>
                                                </div>
                                                <p className="content_middle" id="inside-image-word">
                                                    1. {arr[27]}
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    2. {arr[28]}
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    3. {arr[29]}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick={() => this.serviceSelected("specialist")}>
                                                <strong>{arr[8]}</strong>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="primary-information-box" id="separate-second">
                                        <div className="horizontal-line-box">
                                            <hr/>
                                        </div>
                                        <div className="primary-info-content-box" id="gp">
                                            <h2 className="primary-info-content-top" id="inside-image-title">
                                                {arr[14]}
                                            </h2>
                                            <p className="content_middle" id="inside-image-word">
                                                {arr[15]}
                                            </p>
                                            <img src={image3} width="150px" height="140px"/>
                                            <div className="gp-hover">
                                                <div className="title-image">
                                                    <img src={image3} width="80px" height="69px" id="title-image2"/>
                                                </div>
                                                <p className="content_middle" id="inside-image-word">
                                                    1. {arr[30]}
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    2. {arr[31]}
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    3. {arr[32]}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick={() => this.serviceSelected("hospital")}>
                                                <strong>{arr[8]}</strong>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="primary-wrapper">
                            <div className="primary-box">
                                <div className="primary-title-box">
                                    <h1 id="margin-fixed">{arr[16]}</h1>
                                </div>
                                <div className="primary-content-box">
                                    <div className="primary-information-box">
                                        <div className="horizontal-line-box">
                                            <hr/>
                                        </div>
                                        <div className="primary-info-content-box" id="gp">
                                            <h2 className="primary-info-content-top" id="inside-image-title">
                                                {arr[17]}
                                            </h2>
                                            <p className="content_middle" id="inside-image-word">
                                                {arr[18]}
                                            </p>
                                            <img src={image2} width="115px" height="100px"/>
                                            <div className="gp-hover">
                                                <div className="title-image">
                                                    <img src={image2} width="60px" height="52px" id="title-image2"/>
                                                </div>
                                                <p className="content_middle" id="inside-image-word">
                                                    1. {arr[33]}
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    2. {arr[34]}
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    3. {arr[35]}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick={() => this.serviceSelected("pharmacy")}>
                                                <strong>{arr[8]}</strong>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="primary-information-box" id="separate-second">
                                        <div className="horizontal-line-box">
                                            <hr/>
                                        </div>
                                        <div className="primary-info-content-box" id="ed">
                                            <h2 className="primary-info-content-top" id="inside-image-title">
                                                {arr[19]}
                                            </h2>
                                            <p className="content_middle" id="inside-image-word">
                                                {arr[20]}
                                            </p>
                                            <img src={image5} width="115px" height="100px"/>
                                            <div className="ed-hover">
                                                <div className="title-image">
                                                    <img src={image5} width="60px" height="52px" id="title-image2"/>
                                                </div>
                                                <p className="content_middle" id="inside-image-word">
                                                    1. {arr[36]}
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    2. {arr[37]}
                                                </p>
                                                <p className="content_middle" id="inside-image-word">
                                                    3. {arr[38]}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="primary-button-box">
                                            <button className="learn-more-button" id="button-all"
                                                    onClick={() => this.serviceSelected("helpline")}>
                                                <strong>{arr[8]}</strong>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default medicalServiceHomePage;