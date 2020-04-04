import RestService from '../service/RestService';
import {observable, action, computed} from 'mobx';
import RestInit from '../model/api/RestInit';
import Customer from '../model/Customer';
import CustomerSortField from '../model/CustomerSortField';
import {toNumber} from 'lodash';
import LoginStore from '../login/LoginStore';

class HomeStore {
    loginStore!: LoginStore;

    @observable customers: Array<Customer> = [];

    @observable selectedCustomer: Customer = new Customer();

    @computed
    get isCustomerSelected(): boolean {
        return this.selectedCustomer.Id !== 0;
    }

    init = (): void => {
        this.initCustomers();
    };

    initCustomers = (): void => {
        const restInit: RestInit = new RestInit();
        restInit.url = `/customers`;
        restInit.method = 'GET';
        restInit.header = {
            'Content-Type': 'application/json',
        };
        RestService.fetch(restInit, this.handleInitCustomers).catch((err) => console.log(err));
    };

    @action
    handleInitCustomers = (apiResponse: any): void => {
        this.customers = [...apiResponse];
    };

    @action
    selectCustomer = (customer: Customer): void => {
        this.selectedCustomer = customer;
    };

    addCustomer = (): void => {
        alert('add');
    };

    editCustomer = (): void => {
        alert('edit');
    };

    deleteCustomer = (): void => {
        alert('delete');
    };

    manageCustomerBills = (): void => {
        alert('manage');
    };
}

export default HomeStore;
