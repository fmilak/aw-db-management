import {observer} from 'mobx-react';
import React, {ReactElement, useContext, useEffect} from 'react';
import {RootStoreContext} from '../App';
import Customer from '../model/Customer';
import HomeStore from './HomeStore';
import {Dropdown, Button, Menu, Icon} from 'antd';
import {observable, runInAction} from 'mobx';
import './HomeStyle.css';
import Search from 'antd/lib/input/Search';
import CustomerSortField from '../model/CustomerSortField';

const TableSearch = observer(({store}: {store: HomeStore}) => {
    return (
        <div>
            <Search placeholder="Search text" onKeyUp={event => store.filterTable(event.currentTarget.value)} style={{width: 200}} />
        </div>
    );
});

const TablePaging = observer(({store}: {store: HomeStore}): any => {
    return store.pagingNumber.map((pageNumber: number): any => {
        return (
            <Button
                key={pageNumber}
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

const ListHeader = observer(({store}: {store: HomeStore}): any => {
    const keys = Object.values(CustomerSortField);
    return keys.map((key, index) => {
        return (
            <th key={index} onClick={() => store.changeSortTable(key)}>
                {key}
                <span> </span>
                {store.sort.field === key && <Icon type={store.sort.isAsc ? 'down' : 'up'} />}
            </th>
        );
    });
});

const CustomerList = observer(({store}: {store: HomeStore}): any => {
    return store.customers
        .map((customer: Customer, index: any) => {
            if (index >= store.sortBeginning && index < store.sortEnd)
                return (
                    <tr
                        className="row"
                        key={customer.Id}
                        onClick={() => {
                            store.openSelectedCustomer(customer);
                        }}>
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
    if (!store.customers) {
        return null;
    }
    return (
        <div>
            <div>
                <TableDropdownMenu store={store} />
                <TableSearch store={store} />
            </div>
            <div>
                <TablePaging store={store} />
            </div>
            <table>
                <thead>
                    <ListHeader store={store} />
                </thead>
                <tbody>
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
