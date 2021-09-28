import React, {Component} from 'react';
import Home from './Page/HomePage/Home';
import LoginPage from "./Page/LoginPage/LoginPage";
import SignUpPage from "./Page/SignUpPage/SignUpPage";
import UserPage from "./Compoments/User";
import MainPage from "./Page/MainPage/MainPage";
import cookie from "react-cookies";
import Key from "./privateData.json"
let key = require('./privateData.json');
console.log(key)
console.log(key[0].keyTranslate);


const googleTranslate = require("google-translate")(Key[0].keyTranslate);

class App extends Component {
    state = {
        languageCodes: [],
        language: cookie.load("language") ? cookie.load("language") : "en",
        question: cookie.load("question")
            ? cookie.load("question")
            : "What language do you prefer to read with?"
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
        const { languageCodes, language, question } = this.state;
        return (
            // <div>
            //
            //     {/*<Home/>*/}
            //     {/*<LoginPage/>*/}
            //     {/*<SignUpPage/>*/}
            //     {/*<UserPage/>*/}
            //     {/*<MainPage/>*/}
            // </div>
            <div style={this.divStyle}>
                <button>Translate it!</button>

                <p>{question}</p>

                {/* iterate through language options to create a select box */}
                <select
                    className="select-language"
                    value={language}
                    onChange={e => this.changeHandler(e.target.value)}
                >
                    {languageCodes.map(lang => (
                        <option key={lang.language} value={lang.language}>
                            {lang.name}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    changeHandler = language => {
        let { question } = this.state;
        let cookieLanguage = cookie.load("language");
        let transQuestion = "";

        const translating = transQuestion => {
            if (question !== transQuestion) {
                this.setState({ question: transQuestion });
                cookie.save("question", transQuestion, { path: "/" });
            }
        };

        // translate the question when selecting a different language
        if (language !== cookieLanguage) {
            googleTranslate.translate(question, language, function(err, translation) {
                transQuestion = translation.translatedText;
                translating(transQuestion);
            });
        }

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
