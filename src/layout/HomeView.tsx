import {Button} from 'antd';
import {observer} from 'mobx-react';
import React, {ReactElement, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {RootStoreContext} from '../App';
import CustomTable from '../components/CustomTable';
import './HomeStyle.css';

const HomeView: React.FC = observer(
    (): ReactElement => {
        const {homeStore, loginStore} = useContext(RootStoreContext);
        const history = useHistory();
        homeStore.loginStore = loginStore;
        homeStore.history = history;

        useEffect(() => {
            homeStore.init();
        }, []);

        return (
            <div>
                <h1>Home</h1>

                <div>
                    {loginStore.isAuthenticated && (
                        <div>
                            <Button onClick={homeStore.addCustomer}>Add</Button>
                            <Button disabled={!homeStore.isCustomerSelected} onClick={homeStore.editCustomer}>
                                Edit
                            </Button>
                            <Button disabled={!homeStore.isCustomerSelected} onClick={homeStore.deleteCustomer}>
                                Delete
                            </Button>
                            <Button disabled={!homeStore.isCustomerSelected} onClick={homeStore.manageCustomerBills}>
                                Manage bills
                            </Button>
                        </div>
                    )}
                    <CustomTable data={homeStore.customers} onRowClick={homeStore.selectCustomer} type="customer" />
                </div>
            </div>
        );
    },
);

export default HomeView;
