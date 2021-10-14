import React, {Component} from 'react';
import "./static/demo.css";
import logo from "./static/logo.png"
import {Affix, Breadcrumb, Button, Image, Layout, Menu} from 'antd';
import {createFromIconfontCN} from '@ant-design/icons';
import Location from "./bookLocation";
import Language from "../MainPage/Language";

import GpSelected from "./gpSelected";
import MyAccount from "./MyAccountPage"
import DoctorSelect from "./doctorPage"
import Time from "./time"
import Information from "./bookInformation"
import MyBooking from "./MyBooking";
import MedicalService from "../EmergancyPage/medicalServiceHomePage"
import Emergency from "../EmergancyPage/generalPractitioner"

import cookie from "react-cookies";


const {Header, Sider, Content} = Layout;
const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2823620_iutnvqrlwgc.js', // 在 iconfont.cn 上生成
});

let key = require('../../privateData.json');

const googleTranslate = require("google-translate")(key[0].keyTranslate);

const strings = {
    MenuTitle: {
        1:"Medical Service",
        2:"Medical Booking",
        3:"My Bookings",
        4:"My Account"
    }
}
const arr = [strings.MenuTitle["1"], strings.MenuTitle["2"], strings.MenuTitle["3"], strings.MenuTitle["4"]];

class demo extends Component {

    state = {
        collapsed: false,
        showElem: '1',
        gp: null,
        doctor: null,
        bookingStep: null,
        time: null,
        date: null,
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
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleClick(letter) {
        if (letter === 1 || letter === 3) {
            this.setState({bookingStep: null})
        }
        this.setState({showElem: letter});
    }

    logout() {
        sessionStorage.removeItem("name")
        this.props.history.push("/login")
    }

    gpSelected(info, e, doctor, date, time) {
        this.setState({gp: info})
        this.setState({bookingStep: e})
        this.setState({doctor: doctor})
        this.setState({date: date})
        this.setState({time: time})
    }

    render() {
        const { languageCodes, language} = this.state;
        return (
            <div className="container">
                <Layout>
                    <Sider className="demo" trigger={null} collapsible collapsed={this.state.collapsed} width="15%">
                        <Affix offsetTop={20}>
                            <Menu className="demo" mode="inline" defaultSelectedKeys={['1']}>
                                <div className="image">
                                    <Image preview={false} src={logo} width={40}/>
                                    <p> welcome:</p> {sessionStorage.getItem('name')}
                                </div>
                                <Menu.Item key="1" icon={<MyIcon type="icon-searchforfiles" style={{fontSize: 28}}/>}
                                           onClick={() => this.handleClick("1")}>
                                    {arr[0]}
                                </Menu.Item>
                                <Menu.Item key="2" icon={<MyIcon type="icon-yuyue1" style={{fontSize: 28}}/>}
                                           onClick={() => this.handleClick("2")}>
                                    {arr[1]}
                                </Menu.Item>
                                <Menu.Item key="4" icon={<MyIcon type="icon-yuyuexinxi" style={{fontSize: 28}}/>}
                                           onClick={() => this.handleClick("4")}>
                                    {arr[2]}
                                </Menu.Item>
                                <Menu.Item key="3" icon={<MyIcon type="icon-account" style={{fontSize: 28}}/>}
                                           onClick={() => this.handleClick("3")}>
                                    {arr[3]}
                                    <Button style={{marginBottom: 20, marginLeft: 20}} onClick={() => this.logout()}>
                                        {sessionStorage.getItem("name") === null ? "login in" : "logout"}
                                    </Button>
                                </Menu.Item>

                            </Menu>
                                <select className="select-language" value={language} onChange={(e) => {
                                    this.changeHandler(e.target.value)
                                }}>

                                    {languageCodes.map(lang => (
                                        <option key={lang.language} value={lang.language}>
                                            {lang.name}
                                        </option>
                                    ))}
                                </select>
                        </Affix>

                    </Sider>
                    <div className="controlBar">
                        <Affix offsetTop={120}>
                            <div onClick={() => {
                                this.toggle()
                            }} style={{backgroundColor:"#BFC4C5",height:"60px",textAlign:"center",borderRadius:"3px"}}>
                                {this.state.collapsed===true ? <MyIcon  type="icon-youfanyeyouhua" style={{fontSize: 30, marginTop: 15}}/>:<MyIcon  type="icon-zuofanyezuohua" style={{fontSize: 30, marginTop: 15}}/>}
                            </div>

                        </Affix>
                    </div>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{padding: 5}}>
                            <Breadcrumb separator=">">

                                {this.state.showElem === '1' ? <Breadcrumb.Item>
                                    <p>Medical Service </p>
                                </Breadcrumb.Item> : null}

                                {this.state.showElem === '2' ? <Breadcrumb.Item>
                                    <p>Online Booking</p>
                                </Breadcrumb.Item> : null}

                                {this.state.showElem === '4' ? <Breadcrumb.Item>
                                    <p>My Bookings</p>
                                </Breadcrumb.Item> : null}

                                {this.state.showElem === '3' ? <Breadcrumb.Item>
                                    <p>My Account</p>
                                </Breadcrumb.Item> : null}

                            </Breadcrumb>
                        </Header>
                        <div style={{width: '94%', marginLeft: '3%'}}>
                            <hr/>
                        </div>

                        <Content className="site-layout-background" style={{
                            margin: '24px 16px',
                            padding: 24,
                        }}>
                            {
                                this.state.showElem === '1' ? <MedicalService/> : null
                            }

                            {
                                this.state.showElem === '2' && sessionStorage.getItem('name') === null ? this.props.history.push("/login") : null
                            }

                            {
                                this.state.showElem === '2' && this.state.gp === null && sessionStorage.getItem('name') !== null ?
                                    <Location gpSelected={(info, e) => {
                                        this.gpSelected(info, e)
                                    }}/> : null
                            }

                            {
                                this.state.showElem === '2' && this.state.bookingStep === "GpSelected" ?
                                    <GpSelected gpSelected={(info, e) => {
                                        this.gpSelected(info, e)
                                    }} name={this.state.gp}/> : null
                            }

                            {
                                this.state.showElem === '2' && this.state.bookingStep === "doctor" ?
                                    <DoctorSelect gpSelected={(info, e, doctor) => {
                                        this.gpSelected(info, e, doctor)
                                    }} name={this.state.gp}/> : null
                            }

                            {
                                this.state.showElem === '2' && this.state.bookingStep === "time" ?
                                    <Time gpSelected={(info, e, doctor, date, time) => {
                                        this.gpSelected(info, e, doctor, date, time)
                                    }} name={this.state.gp} doctor={this.state.doctor}/> : null
                            }

                            {
                                this.state.showElem === '2' && this.state.bookingStep === "backHome" ?
                                    <Location gpSelected={(info, e) => {
                                        this.gpSelected(info, e)
                                    }}/> : null
                            }

                            {
                                this.state.showElem === '2' && this.state.bookingStep === "finish" ?
                                    <Information gpSelected={(info, e) => {
                                        this.gpSelected(info, e)
                                    }} name={this.state.gp} doctor={this.state.doctor} date={this.state.date}
                                                 time={this.state.time}/> : null
                            }

                            {
                                this.state.showElem === '3' && sessionStorage.getItem('name') !== null ?
                                    <MyAccount/> : null
                            }

                            {
                                this.state.showElem === '3' && sessionStorage.getItem('name') === null ?
                                    this.props.history.push("/login") : null
                            }

                            {
                                this.state.showElem === '4' && sessionStorage.getItem('name') === null ?
                                    this.props.history.push("/login") : null
                            }

                            {
                                this.state.showElem === '4' && sessionStorage.getItem('name') !== null ?
                                    <MyBooking/> : null
                            }

                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default demo;