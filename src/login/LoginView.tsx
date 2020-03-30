import React, {useContext} from "react";
import {Button, Form, Icon, Input} from "antd";
import '../App.css'
import {RootStoreContext} from "../App";
import {observer} from "mobx-react";

const LoginView: React.FC<any> = observer(() => {
    const rootStore = useContext(RootStoreContext);
    const {loginStore} = rootStore;

    return (
        <Form>
            <Form.Item>
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                       placeholder="Username" onChange={loginStore.onUsernameChange} />
            </Form.Item>
            <Form.Item>
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                    onChange={loginStore.onPasswordChange}
                />
            </Form.Item>
            <Form.Item>
                <Button onClick={loginStore.tryLogin}>Log in</Button>
            </Form.Item>
        </Form>
    )
});

export default LoginView;
