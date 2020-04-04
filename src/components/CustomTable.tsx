import {observable} from 'mobx';
import {observer} from 'mobx-react';
import Customer from '../model/Customer';
import {Icon, Dropdown, Button, Menu} from 'antd';
import CustomTableStore from './CustomTableStore';
import HomeStore from '../layout/HomeStore';
import Search from 'antd/lib/input/Search';
import React from 'react';

const TableSearch = observer(({store}: {store: CustomTableStore}) => {
    return (
        <div>
            <Search placeholder="Search text" onKeyUp={(event) => store.filterTable(event.currentTarget.value)} style={{width: 200}} />
        </div>
    );
});

const TablePaging = observer(({store}: {store: CustomTableStore}): any => {
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

const TableDropdownMenu = observer(({store}: {store: CustomTableStore}) => {
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

const CustomerList = observer(({store}) => {
    return store.data
        .map((customer: Customer, index: any) => {
            if (index >= store.sortBeginning && index < store.sortEnd)
                return (
                    <tr
                        className="row"
                        key={customer.Id}
                        onClick={() => store.onRowClick(customer)}
                        style={store.selected === customer ? {backgroundColor: 'blue'} : {}}>
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

const TableType = observer(({store}) => {
    switch (store.type) {
        case 'customer':
            return <CustomerList store={store} />;
        default:
            return null;
    }
});

const TableHeader = observer(({store}: {store: CustomTableStore}): any => {
    return store.headerKeys.map((key, index) => {
        return (
            <th key={index} onClick={() => store.changeSortTable(key)}>
                {key}
                <span> </span>
                {store.sort.field === key && <Icon type={store.sort.isAsc ? 'down' : 'up'} />}
            </th>
        );
    });
});

interface CustomTableProps {
    data: Array<any>;
    selected: any;
    onRowClick: Function;
    type: string;
}

const CustomTable: React.FC<CustomTableProps> = observer(({data, selected, onRowClick, type}) => {
    const store: CustomTableStore = new CustomTableStore(data, type, selected, onRowClick);

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
                    <TableHeader store={store} />
                </thead>
                <tbody>
                    <TableType store={store} />
                </tbody>
            </table>
        </div>
    );
});

export default CustomTable;
