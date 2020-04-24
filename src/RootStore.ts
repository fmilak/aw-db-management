import HomeStore from './layout/HomeStore';
import RestService from './service/RestService';
import LoginStore from './login/LoginStore';
import CustomerBillsStore from './layout/customer-form/CustomerBillsStore';

class RootStore {
    homeStore: HomeStore = new HomeStore();
    loginStore: LoginStore = new LoginStore();
    customerFormStore: CustomerBillsStore = new CustomerBillsStore();
}

export default RootStore;
