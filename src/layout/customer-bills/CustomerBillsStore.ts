import RestInit from '../../model/api/RestInit';
import RestService from '../../service/RestService';
import {observable, action, computed} from 'mobx';
import Bill from '../../model/Bill';

class CustomerBillsStore {
    selectedCustomerId!: number;

    @observable customerBills: Array<Bill> = [];

    @observable selectedBill: Bill = new Bill();

    history!: any;

    @computed
    get isBillSelected(): boolean {
        return this.selectedBill.Id !== 0;
    }

    @action
    init = () => {
        this.selectedBill = new Bill();
        const restInit: RestInit = new RestInit();
        restInit.url = `/customerbills/${this.selectedCustomerId}`;
        restInit.method = 'GET';
        restInit.header = {
            'Content-Type': 'application/json',
        };
        RestService.fetch(restInit, this.handleInit).catch((err) => console.log(err));
    };

    @action
    handleInit = (responseJson: any) => {
        this.customerBills = [...responseJson];
        console.log(this.customerBills);
    };

    @action
    handleBillSelect = (bill: Bill) => {
        this.selectedBill = bill;
    };

    addBill = () => {
        this.history.push(`/${this.selectedCustomerId}/bills/add`);
    };

    editBill = () => {
        this.history.push(`/${this.selectedCustomerId}/bills/edit`);
    };

    manageItems = () => {
        this.history.push(`/${this.selectedCustomerId}/bills/${this.selectedBill.Id}/items`, {bill: this.mapSelectedBill()});
    };

    deleteBill = () => {
        const restInit: RestInit = new RestInit();
        restInit.url = '/deleteBill';
        restInit.header = {
            'Content-Type': 'application/json',
        };
        restInit.body = JSON.stringify({
            id: this.selectedBill.Id,
        });
        restInit.method = 'POST';
        RestService.fetch(restInit, this.handleDeleteResponse);
    };

    handleDeleteResponse = (apiResponse: any) => {
        this.init();
    };

    mapSelectedBill = () => {
        return {
            Id: this.selectedBill.Id,
            Date: this.selectedBill.Date,
            BillNumber: this.selectedBill.BillNumber,
            CustomerId: this.selectedBill.CustomerId,
            SellerId: this.selectedBill.SellerId,
            CreditCardId: this.selectedBill.CreditCardId,
            Comment: this.selectedBill.Comment,
        };
    };
}

export default CustomerBillsStore;
