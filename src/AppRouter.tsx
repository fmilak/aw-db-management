import {Icon, Layout, Menu} from 'antd';
import {createBrowserHistory} from 'history';
import React, {useContext} from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {RootStoreContext} from './App';
import HomeView from './layout/HomeView';
import ProfileView from './layout/profile/ProfileView';

const {Header, Content} = Layout;

const customHistory = createBrowserHistory();

const AppRouter = () => {
    const {homeStore} = useContext(RootStoreContext);

    return (
        <Router history={customHistory}>
            <div>
                <Layout className="layout" style={{position: 'fixed', zIndex: 1, width: '100%', height: '100%'}}>
                    <Header>
                        <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{lineHeight: '64px'}}>
                            <Menu.Item key="1" onClick={() => customHistory.push('/')}>
                                <Icon type="home" />
                                Home
                            </Menu.Item>
                            <Menu.Item key="3" onClick={() => customHistory.push(`/test`)}>
                                <Icon type="user" />
                                Profile
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{padding: '0 50px'}}>
                        <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                            <Switch>
                                <Route path="/:profileName" children={<ProfileView />} />
                                <Route path="/">
                                    <HomeView />
                                </Route>
                                <Route path="*">
                                    <div>
                                        <span>404</span>
                                    </div>
                                </Route>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </div>
        </Router>
    );
};

export default AppRouter;
