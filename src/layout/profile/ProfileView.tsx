import React, {useContext} from 'react';
import {useParams} from 'react-router';
import {Redirect} from 'react-router-dom';
import {RootStoreContext} from '../../App';

const ProfileView = () => {
    const {profileName} = useParams();
    return (
        <div>
            <h3>{profileName}</h3>
        </div>
    );
};

export default ProfileView;
