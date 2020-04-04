import {observer} from 'mobx-react';
import React, {ReactElement, useContext, useEffect} from 'react';
import {RootStoreContext} from '../App';
import Customer from '../model/Customer';
import HomeStore from './HomeStore';
import {Dropdown, Button, Menu, Icon} from 'antd';
import './HomeStyle.css';
import Search from 'antd/lib/input/Search';
import CustomerSortField from '../model/CustomerSortField';
import LoginStore from '../login/LoginStore';
import CustomTable from '../components/CustomTable';

const HomeView: React.FC = observer(
    (): ReactElement => {
        const {homeStore, loginStore} = useContext(RootStoreContext);
        homeStore.loginStore = loginStore;

        useEffect(() => {
            homeStore.init();
        }, []);

        return (
            <div>
                <h1>Home</h1>

                <div>
                    {loginStore.isAuthenticated && (
                        <div>
                            <Button>Add</Button>
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
