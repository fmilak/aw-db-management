import {observable, action} from 'mobx';
import Bill from '../../../model/Bill';
import {access} from 'fs';
import RestInit from '../../../model/api/RestInit';
import RestService from '../../../service/RestService';

class CustomerBillsFormStore {
    formType!: string;

    history!: any;

    @observable customerId = '';

    @observable currentBill: Bill = new Bill();

    @observable newBill: Bill = new Bill();

    @action
    init = (customerId: string) => {
        this.customerId = customerId;
    };

    @action
    billNumberChange = (e: any): void => {
        this.newBill.BillNumber = e.target.value;
    };

    @action
    dateChange = (e: any): void => {
        this.newBill.Date = e.format('YYYY-MM-DD');
    };

    @action
    sellerIdChange = (e: any): void => {
        this.newBill.SellerId = e.target.value;
    };

    @action
    creditCardIdChange = (e: any): void => {
        this.newBill.CreditCardId = e.target.value;
    };

    @action
    commentChange = (e: any): void => {
        this.newBill.Comment = e.target.value;
    };

    saveForm = () => {
        const restInit: RestInit = new RestInit();
        restInit.url = '/addbill';
        restInit.header = {
            'Content-Type': 'application/json',
        };
        restInit.body = JSON.stringify({
            Date: this.newBill.Date,
            BillNumber: this.newBill.BillNumber,
            CustomerId: this.customerId,
            SellerId: this.newBill.SellerId,
            Comment: this.newBill.Comment,
        });
        restInit.method = 'POST';
        RestService.fetch(restInit, this.handleSaveResponse);
    };

    handleSaveResponse = (responseJson: any) => {
        console.log(responseJson);
        this.history.goBack();
    };

    cancelForm = () => {
        this.history.goBack();
    };
}

export default CustomerBillsFormStore;
