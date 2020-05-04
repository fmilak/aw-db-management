import {observer} from 'mobx-react';
import {useContext} from 'react';
import {RootStoreContext} from '../../App';
import {useParams} from 'react-router-dom';

const CustomerFormView: React.FC = observer(() => {
    const {customerFormStore} = useContext(RootStoreContext);
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

export default CustomerFormView;
