import {action, observable} from "mobx";
import {stringify} from 'querystring';

class LoginStore {

    @observable username = '';

    @observable password = '';

    @action
    onUsernameChange = (e: any): void => {
        this.username = e.target.value;
    };

    @action
    onPasswordChange = (e: any): void => {
        this.password = e.target.value;
    };

    tryLogin = (): void => {
        console.log('Login tried');
        console.log(this.username);
        console.log(this.password);

        const url = 'http://localhost:8080/oauth/token';
        const header = {
            'Authorization': 'Basic dGhlLXJpbmc6cGFzc3dvcmQ=',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };
        const body = {
            username: this.username,
            grant_type: 'password',
            password: this.password,
        };
        fetch(url, {
            method: 'POST',
            headers: header,
            body: stringify(body)
        }).then(response => {
            console.log(response);
            return response.json();
        }).then(responseJson => {
            console.log(responseJson);
        }).catch(err => {
            console.log(err);
        })
    };

}

export default LoginStore;
