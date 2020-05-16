import {toNumber, isNil} from 'lodash';
import {action, computed, observable, runInAction} from 'mobx';
import Customer from '../model/Customer';
import {CustomerSortField, BillSortField, BillItemsSortField} from '../model/SortEnums';
import Bill from '../model/Bill';
import BillItem from '../model/BilItem';

class CustomTableStore {
    @observable sortNumber = 10;

    @observable sortBeginning = 0;

    @observable selectedPage = 1;

    @observable sort = {field: 'Id', isAsc: true};

    @observable type = '';

    @observable data!: Array<any>;

    originalData: Array<any> = [];

    @observable headerKeys: Array<any> = [];

    @observable selected: any = {};

    onRowClick!: Function;

    constructor(data: Array<any>, type: string, onRowClick: Function) {
        runInAction(() => {
            this.data = data;
            this.originalData = [...data];
            this.type = type;
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
            case 'bill':
                this.headerKeys = Object.values(BillSortField);
                break;
            case 'items':
                this.headerKeys = Object.values(BillItemsSortField);
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
            case 'bill':
                this.filterBillTable(value);
                break;
            case 'items':
                this.filterBillItemsTable(value);
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
                (!isNil(customer.Name) && customer.Name.includes(value)) ||
                (!isNil(customer.Surname) && customer.Surname.includes(value)) ||
                (!isNil(customer.Email) && customer.Email.includes(value)) ||
                (!isNil(customer.Telephone) && customer.Telephone.includes(value)) ||
                (!isNil(customer.CityId) && customer.CityId.toString().includes(value))
            ) {
                return customer;
            }
        });
    };

    @action
    filterBillTable = (value: string): void => {
        this.data = this.originalData.filter((bill: Bill) => {
            if (
                (!isNil(bill.BillNumber) && bill.BillNumber.includes(value)) ||
                (!isNil(bill.Comment) && bill.Comment.includes(value)) ||
                (!isNil(bill.Date) && bill.Date.toString().includes(value)) ||
                (!isNil(bill.Id) && bill.Id.toString().includes(value)) ||
                (!isNil(bill.CustomerId) && bill.CustomerId.toString().includes(value)) ||
                (!isNil(bill.CreditCardId) && bill.CreditCardId.toString().includes(value)) ||
                (!isNil(bill.SellerId) && bill.SellerId.toString().includes(value))
            ) {
                return bill;
            }
        });
    };

    @action
    filterBillItemsTable = (value: string): void => {
        this.data = this.originalData.filter((item: BillItem) => {
            if (
                (!isNil(item.Id) && item.Id.toString().includes(value)) ||
                (!isNil(item.BillId) && item.BillId.toString().includes(value)) ||
                (!isNil(item.ProductId) && item.ProductId.toString().includes(value)) ||
                (!isNil(item.Quantity) && item.Quantity.toString().includes(value)) ||
                (!isNil(item.PricePerPiece) && item.PricePerPiece.toString().includes(value)) ||
                (!isNil(item.TotalPrice) && item.TotalPrice.toString().includes(value))
            ) {
                return item;
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
            case 'bill':
                this.sortBillTable();
                break;
            case 'items':
                this.sortBillItemsTable();
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

    @action
    private sortBillTable = (): void => {
        this.data = this.data.slice().sort((a: Bill, b: Bill): any => {
            if (
                this.sort.field === BillSortField.ID ||
                this.sort.field === BillSortField.CUSTOMER_ID ||
                this.sort.field === BillSortField.SELLER_ID ||
                this.sort.field === BillSortField.CREDIT_CARD_ID ||
                this.sort.field === BillSortField.DATE
            ) {
                if (this.sort.isAsc) {
                    return toNumber(a[this.sort.field]) - toNumber(b[this.sort.field]);
                } else {
                    return toNumber(b[this.sort.field]) - toNumber(a[this.sort.field]);
                }
            } else if (this.sort.field === BillSortField.BILL_NUMBER || this.sort.field === BillSortField.COMMENT) {
                if (this.sort.isAsc) {
                    return a[this.sort.field].localeCompare(b[this.sort.field]);
                } else {
                    return b[this.sort.field].localeCompare(a[this.sort.field]);
                }
            }
        });
    };

    @action
    private sortBillItemsTable = (): void => {
        this.data = this.data.slice().sort((a: BillItem, b: BillItem): any => {
            if (
                this.sort.field === BillItemsSortField.ID ||
                this.sort.field === BillItemsSortField.BILL_ID ||
                this.sort.field === BillItemsSortField.PRODUCT_ID ||
                this.sort.field === BillItemsSortField.TOTAL_PRICE ||
                this.sort.field === BillItemsSortField.PRICE_PER_PIECE ||
                this.sort.field === BillItemsSortField.QUANTITY
            ) {
                if (this.sort.isAsc) {
                    return toNumber(a[this.sort.field]) - toNumber(b[this.sort.field]);
                } else {
                    return toNumber(b[this.sort.field]) - toNumber(a[this.sort.field]);
                }
            }
        });
    };

    @action
    rowClick = (value: any): void => {
        if (this.selected === value) {
            this.selected = this.getNewSelected();
        } else {
            this.selected = value;
        }
        this.onRowClick(this.selected);
    };

    getNewSelected = (): any => {
        switch (this.type) {
            case 'customer':
                return new Customer();
            case 'bill':
                return new Bill();
            case 'items':
                return new BillItem();
            default:
                return {};
        }
    };
}

export default CustomTableStore;
