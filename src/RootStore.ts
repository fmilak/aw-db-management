import HomeStore from './layout/HomeStore';
import RestService from './service/RestService';
import LoginStore from './login/LoginStore';
import CustomerFormStore from './layout/customer-form/CustomerFormStore';

class RootStore {
    homeStore: HomeStore = new HomeStore();
    loginStore: LoginStore = new LoginStore();
    customerFormStore: CustomerFormStore = new CustomerFormStore();
}

export default RootStore;
