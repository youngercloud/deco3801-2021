import React, {Component} from 'react';
import "./static/demo.css";
import logo from "./static/logo.png"
import {Affix, Layout, Menu} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const MyIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2823620_rzkgof69ww.js', // 在 iconfont.cn 上生成
});
class demo extends Component {

    state = {
        collapsed: true,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return (
            <div className="container">
                <Layout>
                    <Sider className="demo" trigger={null} collapsible collapsed={this.state.collapsed} width="15%" >
                            <Affix offsetTop={20}>
                                <Menu className="demo" mode="inline" defaultSelectedKeys={['1']}>
                                    <div className="image">
                                        <img src={logo} width={30}/>
                                    </div>
                                    <Menu.Item key="1" icon={<MyIcon type="icon-searchforfiles" style={{fontSize:28}}/>}>
                                        Medical Service
                                    </Menu.Item>
                                    <Menu.Item key="2" icon={<MyIcon type="icon-yuyue1" style={{fontSize:28}}/>}>
                                        Medical Booking
                                    </Menu.Item>
                                    <Menu.Item key="3" icon={<MyIcon type="icon-account" style={{fontSize:28}}/>}>
                                        My Account
                                    </Menu.Item>
                                </Menu>
                            </Affix>

                    </Sider>
                    <div className="controlBar">
                        <Affix offsetTop={50}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        </Affix>
                    </div>
                    <Layout className="site-layout">
                        <Header className="site-layout-background" style={{ padding: 0 }}>
                        </Header>
                        <Content
                            className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            <p >dd</p>
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            v
                            Content
                            <br/>
                            <br/>
                            v
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>
                            Content
                            <br/>
                            <br/>Content
                            <br/>
                            <br/>



                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default demo;