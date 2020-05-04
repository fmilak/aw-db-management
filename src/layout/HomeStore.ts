import {action, computed, observable} from 'mobx';
import LoginStore from '../login/LoginStore';
import RestInit from '../model/api/RestInit';
import Customer from '../model/Customer';
import RestService from '../service/RestService';

class HomeStore {
    loginStore!: LoginStore;

    history!: any;

    @observable customers: Array<Customer> = [];

    @observable selectedCustomer: Customer = new Customer();

    @computed
    get isCustomerSelected(): boolean {
        return this.selectedCustomer.Id !== 0;
    }

    @action
    init = (): void => {
        this.initCustomers();
        this.selectedCustomer = new Customer();
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
        this.history.push('/add');
    };

    editCustomer = (): void => {
        this.history.push('/edit');
    };

    deleteCustomer = (): void => {
        const restInit: RestInit = new RestInit();
        restInit.url = `/deletecustomer`;
        restInit.method = 'POST';
        restInit.header = {
            'Content-Type': 'application/json',
        };
        restInit.body = JSON.stringify({
            id: this.selectedCustomer.Id,
        });
        RestService.fetch(restInit, this.handleCustomerDelete).catch((err) => console.log(err));
    };

    @action
    handleCustomerDelete = (responseJson: any): void => {
        alert(`Customer ${this.selectedCustomer.Id} successfully deleted!`);
        this.selectedCustomer = new Customer();
        this.initCustomers();
    };

    manageCustomerBills = (): void => {
        this.history.push(`/${this.selectedCustomer.Id}/bills`);
    };
}

export default HomeStore;
