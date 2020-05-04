import {action, observable, computed} from 'mobx';
import BillItem from '../../../model/BilItem';
import RestInit from '../../../model/api/RestInit';
import RestService from '../../../service/RestService';

class BillItemsStore {
    selectedCustomerId!: number;

    selectedBillId!: string | undefined;

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
        // todo
    };

    editItem = () => {
        // todo
    };

    deleteItem = () => {
        // todo
    };
}

export default BillItemsStore;
