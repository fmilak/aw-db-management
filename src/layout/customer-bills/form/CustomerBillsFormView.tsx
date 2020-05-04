import {observer} from 'mobx-react';
import React, {useContext} from 'react';
import {useParams} from 'react-router-dom';
import {RootStoreContext} from '../../../App';

const CustomerBillsFormView: React.FC = observer(() => {
    const {customerBillsFormStore} = useContext(RootStoreContext);
    let {formType} = useParams();

    if (formType === 'add') {
        return (
            <div>
                <text>add</text>
            </div>
        );
    } else if (formType === 'edit') {
        return (
            <div>
                <text>edit</text>
            </div>
        );
    }
    return null;
});

export default CustomerBillsFormView;
