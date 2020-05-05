import {Button, Form, Input} from 'antd';
import {observer} from 'mobx-react';
import React, {useContext, useEffect} from 'react';
import {useParams, useLocation, useHistory} from 'react-router-dom';
import {RootStoreContext} from '../../../../App';
import BillItemsFormStore from './BillItemsFormStore';
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

const ItemForm = observer(({store}: {store: BillItemsFormStore}) => {
    return (
        <Form {...formItemLayout}>
            <Form.Item label="Bill ID">
                <Input placeholder={store.currentBillItem.BillId} defaultValue={store.billId} disabled />
            </Form.Item>

            <Form.Item label="Product ID">
                <Input
                    placeholder="Product ID"
                    onChange={store.productIdChange}
                    defaultValue={store.formType === 'edit' ? store.currentBillItem.ProductId : ''}
                />
            </Form.Item>

            <Form.Item label="Quantity">
                <Input
                    placeholder="Quantity"
                    onChange={store.quantityChange}
                    defaultValue={store.formType === 'edit' ? store.currentBillItem.Quantity : ''}
                />
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

const BillItemsFormView: React.FC = observer(() => {
    const {billItemsFormStore} = useContext(RootStoreContext);
    let {formType, billId} = useParams();
    let {state} = useLocation();
    billItemsFormStore.history = useHistory();
    billItemsFormStore.formType = !formType ? '' : formType;
    billItemsFormStore.billId = !billId ? '' : billId;

    useEffect(() => {
        runInAction(() => {
            billItemsFormStore.currentBillItem = {...state.billItem};
        });
    }, []);

    return <ItemForm store={billItemsFormStore} />;
});

export default BillItemsFormView;
