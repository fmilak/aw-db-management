import {isNil} from 'lodash';
import {action, observable} from 'mobx';
import RestInit from '../model/api/RestInit';
import User from '../model/User';
import RestService from '../service/RestService';

class LoginStore {
    @observable username = '';

    @observable password = '';

    @observable isAuthenticated = false;

    @observable user = new User();

    @action
    onUsernameChange = (e: any): void => {
        this.username = e.target.value;
    };

    @action
    onPasswordChange = (e: any): void => {
        this.password = e.target.value;
    };

    @action
    tryLogin = (): void => {
        const restInit: RestInit = new RestInit();
        restInit.url = '/login';
        restInit.header = {
            'Content-Type': 'application/json',
        };
        restInit.body = JSON.stringify({
            username: this.username,
            password: this.password,
        });
        restInit.method = 'POST';
        RestService.fetch(restInit, this.handleLoginResponse);
    };

    @action
    handleLoginResponse = (responseJson: any): void => {
        console.log(responseJson);
        if (!isNil(responseJson.token)) {
            this.isAuthenticated = true;
            this.user.username = responseJson.username;
            localStorage.setItem('token', responseJson.token);
            alert('Login successful');
        } else {
            alert('Login error');
        }
    };
}

export default LoginStore;
