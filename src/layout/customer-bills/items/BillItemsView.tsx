import {Button} from 'antd';
import {toNumber} from 'lodash';
import {observer} from 'mobx-react';
import React, {useContext, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {RootStoreContext} from '../../../App';
import CustomTable from '../../../components/CustomTable';

const BillItemsView: React.FC = observer(() => {
    const {billItemsStore, loginStore} = useContext(RootStoreContext);
    let {customerId, billId} = useParams();
    billItemsStore.selectedCustomerId = toNumber(customerId);
    billItemsStore.selectedBillId = billId;
    billItemsStore.history = useHistory();

    useEffect(() => {
        billItemsStore.init();
    }, []);

    return (
        <div>
            {loginStore.isAuthenticated && (
                <div>
                    <Button onClick={billItemsStore.addItem}>Add</Button>
                    <Button disabled={!billItemsStore.isItemSelected} onClick={billItemsStore.editItem}>
                        Edit
                    </Button>
                    <Button disabled={!billItemsStore.isItemSelected} onClick={billItemsStore.deleteItem}>
                        Delete
                    </Button>
                </div>
            )}
            <CustomTable data={billItemsStore.billItems.slice()} onRowClick={billItemsStore.handleItemSelect} type="items" />
        </div>
    );
});

export default BillItemsView;
