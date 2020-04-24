import {observer} from 'mobx-react';
import React, {useContext} from 'react';
import {RootStoreContext} from '../../App';
import {useParams} from 'react-router-dom';

const AddForm = observer(() => {
    return (
        <div>
            <span>adding</span>
        </div>
    );
});

const UpdateForm = observer(() => {
    return (
        <div>
            <span>editing</span>
        </div>
    );
});

const CustomerFormView: React.FC = observer(() => {
    const {customerFormStore} = useContext(RootStoreContext);
    let {form} = useParams();

    switch (form) {
        case 'add':
            return <AddForm />;
        case 'edit':
            return <UpdateForm />;
        default:
            return null;
    }
});

export default CustomerFormView;
