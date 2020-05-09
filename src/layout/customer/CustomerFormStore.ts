import {action, observable, runInAction, has} from 'mobx';
import Customer from '../../model/Customer';
import RestInit from '../../model/api/RestInit';
import RestService from '../../service/RestService';
import {toUnicode} from 'punycode';
import {toNumber} from 'lodash';

class CustomerFormStore {
    formType!: string;

    history!: any;

    currentCustomerId = 0;

    @observable newCustomer: Customer = new Customer();

    @action
    init = (selectedCustomer: Customer) => {
        this.currentCustomerId = selectedCustomer.Id;
        this.newCustomer = selectedCustomer;
    };

    @action
    nameChange = (e: any): void => {
        this.newCustomer.Name = e.target.value;
    };

    @action
    surnameChange = (e: any): void => {
        this.newCustomer.Surname = e.target.value;
    };

    @action
    emailChange = (e: any): void => {
        this.newCustomer.Email = e.target.value;
    };

    @action
    telephoneChange = (e: any): void => {
        this.newCustomer.Telephone = e.target.value;
    };

    @action
    cityIdChange = (e: any): void => {
        this.newCustomer.CityId = e.target.value;
    };

    saveForm = () => {
        const restInit: RestInit = new RestInit();
        if (this.formType === 'edit') {
            restInit.url = '/editcustomer';
        } else {
            restInit.url = '/addcustomer';
        }
        restInit.header = {
            'Content-Type': 'application/json',
        };
        restInit.body = JSON.stringify(this.getBodyObject());
        restInit.method = 'POST';
        RestService.fetch(restInit, this.handleSaveResponse);
    };

    getBodyObject = () => {
        if (this.formType === 'edit') {
            return {
                Id: this.currentCustomerId,
                Name: this.newCustomer.Name,
                Surname: this.newCustomer.Surname,
                Email: this.newCustomer.Email,
                Telephone: this.newCustomer.Telephone,
                CityId: toNumber(this.newCustomer.CityId),
            };
        }
        return {
            Name: this.newCustomer.Name,
            Surname: this.newCustomer.Surname,
            Email: this.newCustomer.Email,
            Telephone: this.newCustomer.Telephone,
            CityId: this.newCustomer.CityId,
        };
    };

    @action
    handleSaveResponse = (responseJson: any) => {
        console.log(responseJson);
        this.newCustomer = new Customer();
        this.history.goBack();
    };

    @action
    cancelForm = () => {
        this.newCustomer = new Customer();
        this.history.goBack();
    };
}
export default CustomerFormStore;
