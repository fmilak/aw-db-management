import {observer} from 'mobx-react';
import React, {useContext, useEffect} from 'react';
import {RootStoreContext} from '../../App';
import {useParams, useHistory} from 'react-router-dom';
import {toNumber} from 'lodash';
import CustomTable from '../../components/CustomTable';
import {Button} from 'antd';

const CustomerBillsView: React.FC = observer(() => {
    const {customerBillsStore, loginStore} = useContext(RootStoreContext);
    let {customerId} = useParams();
    customerBillsStore.selectedCustomerId = toNumber(customerId);
    customerBillsStore.history = useHistory();

    useEffect(() => {
        customerBillsStore.init();
    }, []);

    return (
        <div>
            {loginStore.isAuthenticated && (
                <div>
                    <Button onClick={customerBillsStore.addBill}>Add</Button>
                    <Button disabled={!customerBillsStore.isBillSelected} onClick={customerBillsStore.editBill}>
                        Edit
                    </Button>
                </div>
            )}
            <CustomTable
                data={customerBillsStore.customerBills.slice()}
                onRowClick={customerBillsStore.handleBillSelect}
                type="bill"
            />
        </div>
    );
});

export default CustomerBillsView;
