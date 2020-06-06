import {Button, Col, Form, Icon, Input, Row} from 'antd';
import {observer} from 'mobx-react';
import React, {useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {RootStoreContext} from '../App';
import '../App.css';

const LoginView: React.FC<any> = observer(() => {
    const rootStore = useContext(RootStoreContext);
    const {loginStore} = rootStore;

    return (
        <div style={{marginTop: 50}}>
            <Form>
                <Row>
                    <Col span={24} style={{alignContent: 'center', justifyContent: 'center', display: 'flex', marginBottom: 25}}>
                        <label style={{fontSize: 40}}>Login</label>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{alignContent: 'center', justifyContent: 'center', display: 'flex'}}>
                        <Col span={8}>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                                    placeholder="Username"
                                    onChange={loginStore.onUsernameChange}
                                    onPressEnter={loginStore.tryLogin}
                                />
                            </Form.Item>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{alignContent: 'center', justifyContent: 'center', display: 'flex'}}>
                        <Col span={8}>
                            <Form.Item>
                                <Input
                                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
                                    type="password"
                                    placeholder="Password"
                                    onPressEnter={loginStore.tryLogin}
                                    onChange={loginStore.onPasswordChange}
                                />
                            </Form.Item>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{alignContent: 'center', justifyContent: 'center', display: 'flex'}}>
                        <Col span={4} style={{alignContent: 'center', justifyContent: 'flex-end', display: 'flex', margin: 10}}>
                            <Form.Item>
                                <Button onClick={loginStore.tryLogin}>Log in</Button>
                            </Form.Item>
                        </Col>
                    </Col>
                </Row>
            </Form>
        </div>
    );
});

export default LoginView;
