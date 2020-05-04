import {Icon, Layout, Menu} from 'antd';
import {createBrowserHistory} from 'history';
import React, {useContext} from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {RootStoreContext} from './App';
import CustomerBillsView from './layout/customer-bills/CustomerBillsView';
import HomeView from './layout/HomeView';
import LoginView from './login/LoginView';
import CustomerBillsFormView from './layout/customer-bills/form/CustomerBillsFormView';
import CustomerFormView from './layout/customer/CustomerFormView';

const {Header, Content} = Layout;

const customHistory = createBrowserHistory();

const AppRouter = () => {
    return (
        <Router history={customHistory}>
            <div>
                <Layout className="layout" style={{position: 'fixed', zIndex: 1, width: '100%', height: '100%'}}>
                    <Header>
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={[customHistory.location.key ? customHistory.location.key : '1']}
                            style={{lineHeight: '64px'}}>
                            <Menu.Item key="1" onClick={() => customHistory.push('/')}>
                                <Icon type="home" />
                                Home
                            </Menu.Item>
                            <Menu.Item key="2" onClick={() => customHistory.push(`/login`)}>
                                <Icon type="user" />
                                Login
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{padding: '0 50px'}}>
                        <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                            <Switch>
                                <Route path="/login">
                                    <LoginView />
                                </Route>
                                <Route path="/:customerId/:formType">
                                    <CustomerFormView />
                                </Route>
                                <Route path="/:customerId/bills/:formType">
                                    <CustomerBillsFormView />
                                </Route>
                                <Route path="/:customerId/bills">
                                    <CustomerBillsFormView />
                                </Route>
                                <Route path="/:customerId">
                                    <CustomerBillsView />
                                </Route>
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
