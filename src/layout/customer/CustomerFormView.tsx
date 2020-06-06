import {observer} from 'mobx-react';
import {useContext, useEffect} from 'react';
import {RootStoreContext} from '../../App';
import {useParams, useLocation, useHistory, StaticRouter} from 'react-router-dom';
import React from 'react';
import CustomerBillsFormStore from '../customer-bills/form/CustomerBillsFormStore';
import {Form, Input, DatePicker, Button} from 'antd';
import CustomerFormStore from './CustomerFormStore';
import {runInAction} from 'mobx';

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const CustomerForm = observer(({store}: {store: CustomerFormStore}) => {
    return (
        <Form {...formItemLayout}>
            <Form.Item label="Name">
                <Input placeholder="Name" value={store.newCustomer.Name} onChange={store.nameChange} />
            </Form.Item>

            <Form.Item label="Surname">
                <Input placeholder="Surname" onChange={store.surnameChange} value={store.newCustomer.Surname} />
            </Form.Item>

            <Form.Item label="E-mail">
                <Input placeholder="E-mail" onChange={store.emailChange} value={store.newCustomer.Email} />
            </Form.Item>

            <Form.Item label="Telephone">
                <Input placeholder="Telephone" onChange={store.telephoneChange} value={store.newCustomer.Telephone} />
            </Form.Item>

            <Form.Item label="City ID">
                <Input placeholder="City ID" onChange={store.cityIdChange} value={store.newCustomer.CityId} />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" onClick={store.saveForm}>
                    Save
                </Button>

                <Button type="primary" onClick={store.cancelForm}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
});

const CustomerFormView: React.FC = observer(() => {
    const {customerFormStore} = useContext(RootStoreContext);
    let {formType} = useParams();
    let {state} = useLocation();
    customerFormStore.formType = !formType ? '' : formType;
    customerFormStore.history = useHistory();

    useEffect(() => {
        customerFormStore.init({...state.selectedCustomer});
    }, []);

    return <CustomerForm store={customerFormStore} />;
});

export default CustomerFormView;
