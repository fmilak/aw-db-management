import RestService from '../service/RestService';
import {observable, action} from 'mobx';
import RestInit from '../model/api/RestInit';
import Customer from '../model/Customer';

class HomeStore {
    @observable customers: Array<Customer> = [];

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
        RestService.fetch(restInit, this.handleInitCustomers).catch(err => console.log(err));
    };

    @action
    handleInitCustomers = (apiResponse: any): void => {
        this.customers = [...apiResponse];
        console.log(this.customers);
    };
}

export default HomeStore;
