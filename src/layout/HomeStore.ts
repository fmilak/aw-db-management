import RestService from '../service/RestService';
import {observable, action, computed} from 'mobx';
import RestInit from '../model/api/RestInit';
import Customer from '../model/Customer';

class HomeStore {
    @observable customers: Array<Customer> = [];

    @observable sortNumber = 10;

    @observable sortBeginning = 0;

    @observable selectedPage = 1;

    @computed
    get sortEnd(): number {
        return this.sortBeginning + this.sortNumber > this.customers.length
            ? this.customers.length
            : this.sortBeginning + this.sortNumber;
    }

    @computed
    get pagingNumber(): Array<number> {
        const end = Math.ceil(this.customers.length / this.sortNumber);
        let pages: Array<number> = [];
        for (let i = 1; i <= end; i++) {
            pages.push(i);
        }
        return pages;
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
        RestService.fetch(restInit, this.handleInitCustomers).catch(err => console.log(err));
    };

    @action
    handleInitCustomers = (apiResponse: any): void => {
        this.customers = [...apiResponse];
        console.log(this.customers);
    };

    @action
    changeSortNumber = (value: number): void => {
        this.sortBeginning = 0;
        this.sortNumber = value;
    };

    @action
    changeTablePaging = (value: number): void => {
        this.sortBeginning = (value - 1) * this.sortNumber;
        this.selectedPage = value;
    };
}

export default HomeStore;
