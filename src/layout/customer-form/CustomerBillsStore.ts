import RestInit from '../../model/api/RestInit';
import RestService from '../../service/RestService';
import {observable, action} from 'mobx';
import Bill from '../../model/Bill';

class CustomerBillsStore {
    selectedCustomerId!: number;

    @observable customerBills: Array<Bill> = [];

    init = () => {
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
}

export default CustomerBillsStore;
