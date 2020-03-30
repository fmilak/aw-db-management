import {observer} from "mobx-react";
import React, {ReactElement} from "react";

const HomeView: React.FC = observer((): ReactElement => {
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
});

export default HomeView;