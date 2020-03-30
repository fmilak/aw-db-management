import {Button, Form, Icon, Input} from 'antd';
import {observer} from 'mobx-react';
import React, {useContext} from 'react';
import {RootStoreContext} from '../App';
import '../App.css';

const LoginView: React.FC<any> = observer(() => {
    const {loginStore} = useContext(RootStoreContext);

    return (
        <Form>
            <Form.Item>
                <Input
                    prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />}
                    placeholder="Username"
                    onChange={loginStore.onUsernameChange}
                />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />}
                    type="password"
                    placeholder="Password"
                    onChange={loginStore.onPasswordChange}
                />
            </Form.Item>
            <Form.Item>
                <Button onClick={loginStore.tryLogin}>Log in</Button>
            </Form.Item>
        </Form>
    );
});

export default LoginView;
