import {observable, action} from 'mobx';
import RestInit from '../../../../model/api/RestInit';
import {Base64} from 'js-base64';
import RestService from '../../../../service/RestService';
import BillItem from '../../../../model/BilItem';
import Bill from '../../../../model/Bill';

class BillItemsFormStore {
    formType = '';

    history: any;

    billId!: string;

    @observable currentBillItem: BillItem = new BillItem();

    @observable productId = '';

    @observable quantity = '';

    @action
    productIdChange = (e: any): void => {
        this.productId = e.target.value;
    };

    @action
    quantityChange = (e: any): void => {
        this.quantity = e.target.value;
    };

    @action
    init = () => {
        this.productId = this.formType === 'edit' ? this.currentBillItem.ProductId : '';
        this.quantity = this.formType === 'edit' ? this.currentBillItem.Quantity : '';
    };

    saveForm = () => {
        let newBill: BillItem = new BillItem();
        newBill.BillId = this.billId;
        newBill.ProductId = this.productId;
        newBill.Quantity = this.quantity;

        const restInit: RestInit = new RestInit();
        restInit.url = '/additem';
        restInit.header = {
            'Content-Type': 'application/json',
        };
        restInit.body = JSON.stringify({
            BillId: newBill.BillId,
            ProductId: newBill.ProductId,
            Quantity: newBill.Quantity,
        });
        restInit.method = 'POST';
        RestService.fetch(restInit, this.handleSaveResponse);
    };

    handleSaveResponse = (responseJson: any) => {
        console.log(responseJson);
    };

    cancelForm = () => {
        this.history.goBack();
    };
}

export default BillItemsFormStore;