import React, {useContext} from "react";
import {useParams} from "react-router";
import {RootStoreContext} from "../../App";
import {Redirect} from "react-router-dom";

const ProfileView = () => {
    const {profileName} = useParams();
    const rootStore = useContext(RootStoreContext);
    const {loginStore} = rootStore;
    // todo -> if logged in show different profiles
    if (loginStore.username === profileName) {
        return (
            <div>
                <h3>{profileName}</h3>
            </div>
        )
    }
    // todo -> error saying you need to be logged in to view others profiles
    return (
        <Redirect to="/login" />
    )
};

export default ProfileView;