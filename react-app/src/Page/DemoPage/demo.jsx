
import React, {Component} from 'react';
import "./static/demo.css";
import logo from "./static/logo.png"
import {Affix, Breadcrumb, Button, Layout, Menu} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import Location from "./bookLocation";
import Language from "../MainPage/Language";

import GpSelected from "./gpSelected";
import MyAccount from "./MyAccountPage"
import DoctorSelect from "./doctorPage"
import Time from "./time"
import Information from "./bookInformation"
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';



const { Header, Sider, Content } = Layout;
const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2823620_zamhq7x1cg.js', // 在 iconfont.cn 上生成
});
class demo extends Component {

    state = {
        collapsed: true,
        showElem:'1',
        gp:null,
        doctor:null,
        bookingStep:null,
        time:null,
        date:null,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleClick(letter) {
        if (letter===1 || letter===3){
            this.setState({bookingStep:null})
        }
        this.setState({ showElem: letter });

    }

    logout(){
        sessionStorage.removeItem("name")
        this.props.history.push("/login")
    }

    gpSelected(info,e,doctor,date,time){
        this.setState({gp:info})
        this.setState({ bookingStep:e})
        this.setState({ doctor:doctor})
        this.setState({ date:date})
        this.setState({ time:time})
    }



    render() {
        return (
            <div className="container">
                <Layout >
                    <Sider className="demo" trigger={null} collapsible collapsed={this.state.collapsed} width="15%" >
                            <Affix offsetTop={20}>
                                <Menu  className="demo" mode="inline" defaultSelectedKeys={['1']} >
                                    <div className="image">
                                        <img src={logo} width={40}/>
                                        <p> welcome:</p> {sessionStorage.getItem('name')}
                                    </div>
                                    <Menu.Item key="1" icon={<MyIcon type="icon-searchforfiles" style={{fontSize:28}}/>} onClick={() => this.handleClick("1")} >
                                        Medical Service
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<MyIcon type="icon-yuyue1" style={{fontSize:28}}/>} onClick={() => this.handleClick("2")}>
                                        Medical Booking
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<MyIcon type="icon-account" style={{fontSize:28}}/>} onClick={() => this.handleClick("3")}>
                                        My Account
                                        <Button style={{marginBottom:20,marginLeft:20}} onClick={()=>this.logout()}>
                                            {sessionStorage.getItem("name")===null ? "login in":"logout"}
                                        </Button>
                                    </Menu.Item>
                                </Menu>
                            </Affix>

                    </Sider>
                    <div className="controlBar">
                        <Affix offsetTop={80}>
                            {<MyIcon  onClick={() => {this.toggle()}} type="icon-huadong" style={{fontSize:15,marginTop:5}}/>}
                        {/*{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {*/}
                        {/*    className: 'trigger',*/}
                        {/*    onClick: this.toggle,*/}

                        {/*})}*/}
                        </Affix>
                    </div>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 5 }} >
                            <Breadcrumb separator=">">
                                {/*<Breadcrumb.Item><p>Home</p></Breadcrumb.Item>*/}
                                {this.state.showElem==='1' ?  <Breadcrumb.Item>
                                    <p>Medical Service</p>
                                </Breadcrumb.Item> : null}

                                {this.state.showElem==='2' ?  <Breadcrumb.Item>
                                    <p>Online Booking</p>
                                </Breadcrumb.Item> : null}

                                {this.state.showElem==='3' ?  <Breadcrumb.Item>
                                    <p>My Account</p>
                                </Breadcrumb.Item> : null}

                            </Breadcrumb>
                        </Header>
                        <div style={{width:'94%',marginLeft:'3%'}}><hr/></div>

                        <Content className="site-layout-background" style={{
                                margin: '24px 16px',
                                padding: 24,

                            }}
                        >


                            {
                                this.state.showElem==='1' ? <Language/>: null
                            }

                            {
                                this.state.showElem==='2' && sessionStorage.getItem('name')===null ? this.props.history.push("/login") : null
                            }

                            {
                                this.state.showElem==='2' && this.state.gp === null && sessionStorage.getItem('name')!== null ? <Location gpSelected={(info,e)=>{this.gpSelected(info,e)}}/> : null
                            }

                            {
                                this.state.showElem==='2' && this.state.bookingStep==="GpSelected" ? <GpSelected gpSelected={(info,e)=>{this.gpSelected(info,e)}} name={this.state.gp}/> : null
                            }

                            {
                                this.state.showElem==='2' && this.state.bookingStep==="doctor" ? <DoctorSelect gpSelected={(info,e,doctor)=>{this.gpSelected(info,e,doctor)}} name={this.state.gp}/> : null
                            }

                            {
                                this.state.showElem==='2' && this.state.bookingStep==="time" ? <Time gpSelected={(info,e,doctor,date,time)=>{this.gpSelected(info,e,doctor,date,time)}} name={this.state.gp} doctor={this.state.doctor}/>: null
                            }

                            {
                                this.state.showElem==='2' && this.state.bookingStep==="backHome" ? <Location gpSelected={(info,e)=>{this.gpSelected(info,e)}}/> : null
                            }

                            {
                                this.state.showElem==='2' && this.state.bookingStep==="finish" ? <Information gpSelected={(info,e)=>{this.gpSelected(info,e)}} name={this.state.gp} doctor={this.state.doctor} date={this.state.date} time={this.state.time}/> : null
                            }

                            {
                                this.state.showElem==='3' && sessionStorage.getItem('name')!== null ?  <MyAccount/> : null
                            }

                            {
                                this.state.showElem==='3' && sessionStorage.getItem('name')===null ? this.props.history.push("/login") : null
                            }
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default demo;