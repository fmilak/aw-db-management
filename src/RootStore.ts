import HomeStore from './layout/HomeStore';
import RestService from './service/RestService';
import LoginStore from './login/LoginStore';
import CustomerBillsStore from './layout/customer-bills/CustomerBillsStore';
import CustomerBillsFormStore from './layout/customer-bills/form/CustomerBillsFormStore';
import CustomerFormStore from './layout/customer/CustomerFormStore';
import BillItemsStore from './layout/customer-bills/items/BillItemsStore';

class RootStore {
    homeStore: HomeStore = new HomeStore();
    loginStore: LoginStore = new LoginStore();
    customerFormStore: CustomerFormStore = new CustomerFormStore();
    customerBillsStore: CustomerBillsStore = new CustomerBillsStore();
    customerBillsFormStore: CustomerBillsFormStore = new CustomerBillsFormStore();
    billItemsStore: BillItemsStore = new BillItemsStore();
}

export default RootStore;
