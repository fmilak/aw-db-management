import {observer} from 'mobx-react';
import React, {ReactElement, useContext, useEffect} from 'react';
import {RootStoreContext} from '../App';
import Customer from '../model/Customer';
import {List} from 'antd';

const CustomerView = observer(({customer}: {customer: Customer}) => {
    return (
        <div>
            <text>{customer.Name}</text>
            <text>{customer.Surname}</text>
        </div>
    );
});

const CustomerList = observer(({customers}: {customers: Array<Customer>}) => {
    if (!customers) {
        return null;
    }
    return (
        <div>
            <List dataSource={customers} itemLayout="vertical" renderItem={customer => <CustomerView customer={customer} />} />
        </div>
    );
});

const HomeView: React.FC = observer(
    (): ReactElement => {
        const {homeStore} = useContext(RootStoreContext);

        useEffect(() => {
            homeStore.init();
        }, []);

        return (
            <div>
                <h1>Home</h1>

                <div>
                    <CustomerList customers={homeStore.customers.slice()} />
                </div>
            </div>
        );
    },
);

export default HomeView;
