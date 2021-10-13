import React, {Component, lazy} from 'react';
import cookie from "react-cookies";
import Language from "./Page/MainPage/Language";

let key = require('./privateData.json');

const googleTranslate = require("google-translate")(key[0].keyTranslate);

const arr = ["What language do you prefer to read with?", "Translate it!", "one", "two", "three"];

class App extends Component {
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

    render() {
        const { languageCodes, language} = this.state;
        return (
            // <div>
            //
            //     {/*<Home/>*/}
            //     {/*<LoginPage/>*/}
            //     {/*<SignUpPage/>*/}
            //     {/*<UserPage/>*/}
            //     <MainPage/>
            // </div>
            <div style={this.divStyle}>
                <button>{arr[1]}</button>
                <p>{arr[0]}</p>


                {/* iterate through language options to create a select box */}
                <select className="select-language" value={language} onChange={(e) => {
                        this.changeHandler(e.target.value)
                    }}>

                    {languageCodes.map(lang => (
                        <option key={lang.language} value={lang.language}>
                            {lang.name}
                        </option>
                    ))}
                </select>
                <p>{arr[2]}</p>
                <p>{arr[3]}</p>
                <p>{arr[4]}</p>
            </div>
        );
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
    };

    // just some inline css to center our demo
    divStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100wh"
    };
}

export default App;
