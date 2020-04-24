import {observer} from 'mobx-react';
import React, {useContext, useEffect} from 'react';
import {RootStoreContext} from '../../App';
import {useParams} from 'react-router-dom';
import {toNumber} from 'lodash';
import CustomTable from '../../components/CustomTable';

const CustomerBillsView: React.FC = observer(() => {
    const {customerFormStore} = useContext(RootStoreContext);
    let {customerId} = useParams();
    customerFormStore.selectedCustomerId = toNumber(customerId);

    useEffect(() => {
        customerFormStore.init();
    }, []);

    return (
        <div>
            <CustomTable data={customerFormStore.customerBills.slice()} onRowClick={() => {}} type="bill" />
        </div>
    );
});

export default CustomerBillsView;
