import {observer} from 'mobx-react';
import React, {ReactElement, useContext, useEffect} from 'react';
import {RootStoreContext} from '../App';
import Customer from '../model/Customer';
import HomeStore from './HomeStore';
import {Dropdown, Button, Menu, Icon} from 'antd';

const TablePaging = observer(({store}: {store: HomeStore}): any => {
    return store.pagingNumber.map((pageNumber: number): any => {
        return (
            <Button
                style={store.selectedPage === pageNumber ? {backgroundColor: 'blue'} : {}}
                onClick={() => store.changeTablePaging(pageNumber)}>
                {pageNumber}
            </Button>
        );
    });
});

const TableDropdownMenu = observer(({store}: {store: HomeStore}) => {
    const menu = (
        <Menu>
            <Menu.Item>
                <a
                    target="_blank"
                    onClick={() => {
                        store.changeSortNumber(10);
                    }}>
                    10
                </a>
            </Menu.Item>
            <Menu.Item>
                <a
                    target="_blank"
                    onClick={() => {
                        store.changeSortNumber(20);
                    }}>
                    20
                </a>
            </Menu.Item>
            <Menu.Item>
                <a
                    target="_blank"
                    onClick={() => {
                        store.changeSortNumber(50);
                    }}>
                    50
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomCenter">
            <Button>
                {store.sortNumber} <Icon type="down" />
            </Button>
        </Dropdown>
    );
});

const ListHeader = observer(({customers}: {customers: Array<Customer>}): any => {
    const keys = Object.keys(customers[0]);
    return keys.map((key, index) => {
        return <th key={index}>{key}</th>;
    });
});

const CustomerList = observer(({store}: {store: HomeStore}): any => {
    return store.customers
        .map((customer: Customer, index: any) => {
            if (index >= store.sortBeginning && index < store.sortEnd)
                return (
                    <tr key={customer.Id}>
                        <td>{customer.Id}</td>
                        <td>{customer.Name}</td>
                        <td>{customer.Surname}</td>
                        <td>{customer.Email}</td>
                        <td>{customer.Telephone}</td>
                        <td>{customer.CityId}</td>
                    </tr>
                );
        })
        .slice();
});

const CustomerTable = observer(({store}: {store: HomeStore}) => {
    if (!store.customers || store.customers.length === 0) {
        return null;
    }
    return (
        <div>
            <div>
                <TableDropdownMenu store={store} />
            </div>
            <div>
                <text>
                    {store.sortBeginning} / {store.sortEnd}
                </text>
            </div>
            <div>
                <TablePaging store={store} />
            </div>
            <table>
                <tbody>
                    <ListHeader customers={store.customers.slice()} />
                    <CustomerList store={store} />
                </tbody>
            </table>
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
                    <CustomerTable store={homeStore} />
                </div>
            </div>
        );
    },
);

export default HomeView;
