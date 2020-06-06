import {Button, Form, Input, DatePicker} from 'antd';
import {observer} from 'mobx-react';
import React, {useContext, useEffect} from 'react';
import {useHistory, useLocation, useParams} from 'react-router-dom';
import {RootStoreContext} from '../../../App';
import CustomerBillsFormStore from './CustomerBillsFormStore';

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

const ItemForm = observer(({store}: {store: CustomerBillsFormStore}) => {
    return (
        <Form {...formItemLayout}>
            <Form.Item label="Bill Number">
                <Input placeholder="Bill Number" onChange={store.billNumberChange} />
            </Form.Item>

            <Form.Item label="Date">
                <DatePicker placeholder="Date" onChange={store.dateChange} />
            </Form.Item>

            <Form.Item label="Seller ID">
                <Input placeholder="Seller ID" onChange={store.sellerIdChange} />
            </Form.Item>

            <Form.Item label="Credit Card ID">
                <Input placeholder="Credit Card ID" onChange={store.creditCardIdChange} />
            </Form.Item>

            <Form.Item label="Comment">
                <Input placeholder="Comment" onChange={store.commentChange} />
            </Form.Item>

            <Form.Item label="Customer ID">
                <Input placeholder={store.customerId} disabled />
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

const CustomerBillsFormView: React.FC = observer(() => {
    const {customerBillsFormStore} = useContext(RootStoreContext);
    let {formType, customerId} = useParams();
    customerBillsFormStore.formType = !formType ? '' : formType;
    customerBillsFormStore.history = useHistory();

    useEffect(() => {
        customerBillsFormStore.init(customerId!);
    }, []);

    return <ItemForm store={customerBillsFormStore} />;
});

export default CustomerBillsFormView;
