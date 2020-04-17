import React from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Menu, Icon,Dropdown,Avatar, message,Badge } from 'antd';
import {connect} from "react-redux"
import logo from "./logo.png"
import "./frame.css"
import { adminRoutes } from "../../routes"
import {clearToken} from "../../utils/auth"
const { Header, Content, Sider } = Layout;
const routes = adminRoutes.filter(route => route.isShow)
//首页--主页面
function index(props) {
    console.log(props)
    const popMenu=(<Menu onClick={(p)=>{
        if(p.key==='logOut'){
            clearToken()
            props.history.push('/login')
        }else{
            // message.info(p.key);
            if(p.key==="noti"){
                props.history.push("/admin/notices")
            }
        }
    }}>
        <Menu.Item key="noti">通知中心</Menu.Item>
        <Menu.Item key="setting">设置</Menu.Item>
        <Menu.Item key="logOut">退出</Menu.Item>
    </Menu>);
    return (
        <Layout>
            <Header className="header" style={{
                backgroundColor: '#428bca'
            }}>
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <Dropdown overlay={popMenu}>
                    <div>
                        <Avatar>U</Avatar>
                        <Badge dot={!props.isAllRead}><span style={{color:'white'}}>超级管理员</span></Badge>
                        <Icon type="down"/>
                    </div>
                </Dropdown>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        {routes.map(route => {
                            return (
                                <Menu.Item key={route.path} onClick={p => { props.history.push(p.key) }}>
                                    <Icon type={route.icon} />
                                    {route.title}</Menu.Item>
                            )
                        })}
                    </Menu>
                </Sider>
                <Layout style={{ padding: '16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <Content
                        className="site-layout-background"
                        style={{
                            // padding: 24,
                            margin: 0,
                            minHeight: 280,
                            backgroundColor: "#fff"
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default connect(state=>state.notice)( withRouter(index))
