import RestService from '../service/RestService';
import {observable, action, computed} from 'mobx';
import RestInit from '../model/api/RestInit';
import Customer from '../model/Customer';
import {Alert} from 'antd';
import CustomerSortField from '../model/CustomerSortField';
import {toNumber} from 'lodash';

class HomeStore {
    @observable customers: Array<Customer> = [];

    originalCustomers: Array<Customer> = [];

    @observable sortNumber = 10;

    @observable sortBeginning = 0;

    @observable selectedPage = 1;

    @observable sort = {field: 'Id', isAsc: true};

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
        this.originalCustomers = [...this.customers];
        this.sortTable();
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

    openSelectedCustomer = (customer: Customer): void => {
        // todo
        alert(customer.Name);
    };

    @action
    filterTable = (value: string): void => {
        this.customers = this.originalCustomers.filter((customer: Customer) => {
            if (
                customer.Name.includes(value) ||
                customer.Surname.includes(value) ||
                customer.Email.includes(value) ||
                customer.Telephone.includes(value) ||
                customer.CityId.toString().includes(value)
            ) {
                return customer;
            }
        });
        this.sortTable();
    };

    @action
    changeSortTable = (field: string): void => {
        if (this.sort.field === field) {
            this.sort.isAsc = !this.sort.isAsc;
        } else {
            this.sort.field = field;
            this.sort.isAsc = true;
        }

        this.sortTable();
    };

    @action
    private sortTable = (): void => {
        this.customers = this.customers.sort((a: Customer, b: Customer): any => {
            if (this.sort.field === CustomerSortField.ID || this.sort.field === CustomerSortField.CITY_ID) {
                if (this.sort.isAsc) {
                    return toNumber(a[this.sort.field]) - toNumber(b[this.sort.field]);
                } else {
                    return toNumber(b[this.sort.field]) - toNumber(a[this.sort.field]);
                }
            } else if (
                this.sort.field === CustomerSortField.NAME ||
                this.sort.field === CustomerSortField.SURNAME ||
                this.sort.field === CustomerSortField.EMAIL ||
                this.sort.field === CustomerSortField.TELEPHONE
            ) {
                if (this.sort.isAsc) {
                    return a[this.sort.field].localeCompare(b[this.sort.field]);
                } else {
                    return b[this.sort.field].localeCompare(a[this.sort.field]);
                }
            }
        });
    };
}

export default HomeStore;
