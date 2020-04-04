import {observable, computed, action, runInAction} from 'mobx';
import Customer from '../model/Customer';
import CustomerSortField from '../model/CustomerSortField';
import {toNumber} from 'lodash';

class CustomTableStore {
    @observable sortNumber = 10;

    @observable sortBeginning = 0;

    @observable selectedPage = 1;

    @observable sort = {field: 'Id', isAsc: true};

    @observable type = '';

    @observable data!: Array<any>;

    originalData: Array<any> = [];

    @observable headerKeys: Array<any> = [];

    @observable selected: any;

    onRowClick!: Function;

    constructor(data: Array<any>, type: string, selected: any, onRowClick: Function) {
        runInAction(() => {
            this.data = data;
            this.originalData = [...data];
            this.type = type;
            this.selected = selected;
            this.onRowClick = onRowClick;
        });

        this.setupHeaderKeys();
        this.sortTable();
    }

    @computed
    get sortEnd(): number {
        return this.sortBeginning + this.sortNumber > this.data.length ? this.data.length : this.sortBeginning + this.sortNumber;
    }

    @computed
    get pagingNumber(): Array<number> {
        const end = Math.ceil(this.data.length / this.sortNumber);
        let pages: Array<number> = [];
        for (let i = 1; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    }

    @action
    setupHeaderKeys = (): void => {
        switch (this.type) {
            case 'customer':
                this.headerKeys = Object.values(CustomerSortField);
                break;
            default:
                break;
        }
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

    @action
    filterTable = (value: string): void => {
        switch (this.type) {
            case 'customer':
                this.filterCustomerTable(value);
                break;
            default:
                break;
        }

        this.sortTable();
    };

    @action
    filterCustomerTable = (value: string): void => {
        this.data = this.originalData.filter((customer: Customer) => {
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
        switch (this.type) {
            case 'customer':
                this.sortCustomerTable();
                break;
            default:
                break;
        }
    };

    @action
    private sortCustomerTable = (): void => {
        this.data = this.data.slice().sort((a: Customer, b: Customer): any => {
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

export default CustomTableStore;
