import {action, computed, observable} from 'mobx';
import RestInit from '../../../model/api/RestInit';
import BillItem from '../../../model/BilItem';
import Bill from '../../../model/Bill';
import RestService from '../../../service/RestService';

class BillItemsStore {
    selectedCustomerId!: number;

    selectedBillId!: string;

    @observable currentBill: Bill = new Bill();

    history: any;

    @observable selectedItem: BillItem = new BillItem();

    @observable billItems: Array<BillItem> = [];

    @computed
    get isItemSelected(): boolean {
        return this.selectedItem.ProductId !== '';
    }

    @action
    init = () => {
        this.selectedItem = new BillItem();
        const restInit: RestInit = new RestInit();
        restInit.url = `/billitems/${this.selectedBillId}`;
        restInit.method = 'GET';
        restInit.header = {
            'Content-Type': 'application/json',
        };
        RestService.fetch(restInit, this.handleInit).catch((err) => console.log(err));
    };

    @action
    handleInit = (responseJson: any) => {
        this.billItems = [...responseJson];
    };

    @action
    handleItemSelect = (item: BillItem) => {
        this.selectedItem = item;
    };

    addItem = () => {
        this.history.push(`/${this.selectedCustomerId}/bills/${this.selectedBillId}/items/add`, {
            billItem: this.mapSelectedBillItem(),
        });
    };

    editItem = () => {
        this.history.push(`/${this.selectedCustomerId}/bills/${this.selectedBillId}/items/edit`, {
            billItem: this.mapSelectedBillItem(),
        });
    };

    deleteItem = () => {
        const restInit: RestInit = new RestInit();
        restInit.url = '/deleteItem';
        restInit.header = {
            'Content-Type': 'application/json',
        };
        restInit.body = JSON.stringify({
            id: this.selectedItem.ProductId, // todo -> see what to send here
        });
        restInit.method = 'POST';
        RestService.fetch(restInit, this.handleDeleteResponse);
    };

    handleDeleteResponse = (apiResponse: any) => {
        this.init();
    };

    mapSelectedBillItem = () => {
        return {
            BillId: this.selectedItem.BillId,
            ProductId: this.selectedItem.ProductId,
            Quantity: this.selectedItem.Quantity,
        };
    };
}

export default BillItemsStore;
