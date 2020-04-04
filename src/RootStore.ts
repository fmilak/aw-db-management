import HomeStore from './layout/HomeStore';
import RestService from './service/RestService';
import LoginStore from './login/LoginStore';

class RootStore {
    homeStore: HomeStore = new HomeStore();
    loginStore: LoginStore = new LoginStore();
}

export default RootStore;
