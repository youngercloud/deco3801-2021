import React, {Component} from 'react';
import Header from "./Header";
import Banner from "./Banner";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Footer from "./Footer";

export default class Home extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Banner/>
                <Page1/>
                <Page2/>
                <Page3/>
                <Page4/>
                <Page5/>
                <Footer/>
            </div>
        );
    }
}